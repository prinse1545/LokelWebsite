// Filename: dashboard.js
// Description: This file implements the dashboard screen
// for businesses to use
//
// Lokel LLC.
//
// Copyright 2020-2022
//
// 2021-01-09

// importing tools
import React, { useEffect, useState, useReducer, createRef, useContext } from "react"
import { useMutation, useQuery, gql } from "@apollo/client";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button, Modal, Form, Row, Alert, Accordion, Card } from "react-bootstrap"
import { PlusCircle, Pencil } from "react-bootstrap-icons";
import ReactMapGL, { Marker } from "react-map-gl"
import UtilityContext from "./config/utility"
import styles from "./app.module.css"
import "mapbox-gl/dist/mapbox-gl.css"


const posts = []

const occDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const eventTypes = [
  "Party",
  "Kickback",
  "Club",
  "Food",
  "Department",
  "Music & Performing Arts",
  "Study",
  "Sports",
  "Business"
]

const eventTypeMap = {
  "Party": "PARTY",
  "Kickback": "KICKBACK",
  "Club": "CLUB",
  "Food": "FOOD",
  "Department": "DEPARTMENT",
  "Music & Performing Arts": "MUSIC_PERFOMING_ARTS",
  "Study": "STUDY",
  "Sports": "SPORTS",
  "Business": "BUSINESS"
}

const weekdayMap = {
  "Sun": "SUNDAY",
  "Mon": "MONDAY",
  "Tue": "TUESDAY",
  "Wed": "WEDNESDAY",
  "Thu": "THURSDAY",
  "Fri": "FRIDAY",
  "Sat": "SATURDAY"
}

const GET_ADDRESS = gql`

  mutation getAddressSuggestions($query: String!) {
    getAddressSuggestions(query: $query)
  }

`;

const CREATE_EVENT = gql`
  mutation createEvent(
    $userLocation: LocationInput!,
    $title: String!,
    $address: String!,
    $description: String,
    $createdBy: ID!,
    $location: LocationInput!,
    $isPublic: Boolean!,
    $type: Type!,
    $isBusiness: Boolean!,
    $weekdays: [Weekday]!,
    $isActive: Boolean!,
    $deployAt: String!,
    $startAt: String!,
    $endAt: String!
  ) {
    createEvent(
      userLocation: $userLocation,
      title: $title,
      address: $address,
      description: $description,
      createdBy: $createdBy,
      location: $location,
      isPublic: $isPublic,
      type: $type,
      isBusiness: $isBusiness,
      weekdays: $weekdays,
      isActive: $isActive,
      deployAt: $deployAt,
      startAt: $startAt
      endAt: $endAt
    ) {
      id
    }
  }
`;

const GET_USER_EVENTS = gql`
  query getUserEvents($userId: ID!) {
    getUserEvents(userId: $userId) {
      id
      title
      address
      description
      link
      type
      weekdays
      startAt
      endAt
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation updateEvent($eventId: ID!, $data: JSON!) {
    updateEvent(id: $eventId, data: $data) {
      id
    }
  }
`;


const Dashboard = ({ Component, pageProps }) => {

  const { userId } = useContext(UtilityContext)
  const [modal, setModal] = useState(false);
  const [formType, setType] = useState("");
  const [errMsg, setMsg] = useState(null);
  const [eventId, setId] = useState(null);
  const [googleQuery, setGQuery] = useState({ predictions: [] })
  const [query, setQuery] = useState([])
  const [getAddSugg, { data, loading, error }] = useMutation(GET_ADDRESS)
  const [postEvent, { data: eventData, error: eventError }] = useMutation(CREATE_EVENT)
  const { data: events, loading: eventsLoading, error: eventsErr, refetch } = useQuery(GET_USER_EVENTS, {
    variables: { userId: userId }
  })
  const [updateEvent, { data: updatedEvent, error: updateErr }] = useMutation(UPDATE_EVENT)

  const router = useRouter()

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 600,
    latitude: 42,
    longitude: -88.6377,
    zoom: 8
  });

  const [modalViewport, setModalViewport] = useState({
    width: "100%",
    height: 300,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {

      setModalViewport(Object.assign({}, modalViewport, {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
      }))
    })
  }, [])

  useEffect(() => {
    if(eventData) {
      hideModal()
    }
  }, [eventData])

  const [post, dispatch] = useReducer(
    (prevPost, action) => {
      switch (action.type) {
        case "UPDATE_FIELD":
          return Object.assign({}, prevPost, action.field)

        default:
          return prevPost
      }
    },
    {
      "title": "",
      "address": "",
      "description": "",
      "links": [],
      "type": "Party",
      "weekdays": [],
      "startAt": "",
      "endAt": "",
      "location": {}
    }
  )

  const updateField = (val, field) => {

    const updateObj = {}
    updateObj[field] = val

    dispatch({ type: "UPDATE_FIELD", field: updateObj })
  }

  const hideModal = () => {

    dispatch({
      type: "UPDATE_FIELD",
      field: {
        "title": "",
        "address": "",
        "description": "",
        "links": [],
        "type": "",
        "weekdays": [],
        "startAt": "",
        "endAt": "",
        "location": {}
      }
    })
    setQuery("")
    setModal(false);
    setId(null);
    setType("");
  }

  const search = async (query) => {
    // Function: search, a function that uses the google API to search
    // for addresses for the user to select
    //
    // Parameter(s):
    //
    //   the query
    //
    // Return Value(s):
    //
    //   none but data is set in state

    setQuery(query)

    // getting addresses
    getAddSugg({ variables: { query: query } }).then((suggestions) => {
      setGQuery(suggestions.data.getAddressSuggestions.predictions)
    }).catch((err) => console.log(err))
  }

  const postXperience = () => {

    if(formType == "") {
      setType("location")
    }
    else {

      const finalPost = Object.assign(post, {
        location: { latitude: modalViewport.latitude, longitude: modalViewport.longitude },
        userLocation: { latitude: modalViewport.latitude, longitude: modalViewport.longitude },
        type: eventTypeMap[post.type],
        weekdays: post.weekdays.map((day) => weekdayMap[day]),
        createdBy: userId,
        isPublic: true,
        isBusiness: true,
        isActive: false,
        deployAt: post.startAt
      })

      if(eventId !== null) {
        // taking out unecessary fields
        const { isPublic, isBusiness, isActive, userLocation, ...updatePost } = finalPost

        updateEvent({ variables: { eventId: eventId, data: updatePost } }).catch((err) => {setMsg(err.message);console.log(JSON.stringify(err))})

        // turning off
        setId(null)
      }
      else {
        // posting
        postEvent({ variables: finalPost }).catch((err) => {setMsg(err.message);console.log(JSON.stringify(err))})
      }

      refetch()
    }

  }

  const handleWeekdays = (e, mode = "on") => {
    let newWeekdays = post.weekdays
    const day = e.target.id
    if(mode === "on") {
      if(e.target.checked == false) {
        newWeekdays = newWeekdays.filter((el) => el !== day);
      }
      else {
        newWeekdays.push(day)
      }
    }
    else {
      newWeekdays = newWeekdays.filter((el) => el !== day);
    }
    updateField(newWeekdays, "weekdays")
  }

  const editEvent = (event) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: {
        "title": event.title,
        "address": event.address,
        "description": event.description,
        "links": event.link,
        "type": event.type,
        "weekdays": event.weekdays.map((day) => Object.keys(weekdayMap)[Object.values(weekdayMap).indexOf(day)]),
        "startAt": event.startAt.slice(0, -8),
        "endAt": event.endAt.slice(0, -8),
      }
    })

    setModalViewport(Object.assign({}, modalViewport, event.location))

    setModal(true)

    setId(event.id)
  }

  return (
    <>
      <div>
        <ReactMapGL
          {...viewport}
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapboxApiAccessToken={"pk.eyJ1IjoibG9rZWwiLCJhIjoiY2thdm1meGZ1MTA1MDJ5b2Mydjh5dGx1dyJ9.noZVSQqdjHFatcTJcLUk7A"}
          mapStyle={"mapbox://styles/lokel/ckbbguxgw08mv1ipbeym55gn6"}
          className={styles.map_blur}
        />
        <div className={"row"}>
          <div className={styles.left}>
            <Link href={"/"}>
              <Image
               src={"/logo.png"}
               height={40}
               width={40}
               />
             </Link>
           </div>
          </div>
          <center>
            <h1 className={styles.title}>Get your business on the map.</h1>
          </center>
        </div>
        <div>
          <center style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <h1>Your Posts</h1>
            <PlusCircle size={32} className={styles.icon} onClick={() => setModal(true)}/>
          </center>
            <Accordion flush>
              {
                events === undefined || events?.getUserEvents?.length === 0 ?
                <center>
                  <h3>Create your first experience</h3>
                </center>
                :
                events?.getUserEvents.map((event, indx) => {
                  return (
                    <Accordion.Item eventKey={indx}>
                      <Accordion.Header>
                        <Card style={{ width: "100%", borderLeftWidth: 0 }}>
                          <Card.Body>
                            <Card.Title>{event.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{event.address}</Card.Subtitle>
                            <Card.Text>
                              {event.description}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Card style={{ width: "100%", borderLeftWidth: 0 }}>
                          <Card.Body>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <h6>Edit</h6>
                            <Pencil size={18} className={styles.icon} onClick={() => editEvent(event)}/>
                            </div>
                            <hr />
                            {
                              event.link !== undefined && event?.link?.length > 0 &&
                              <h5>Links</h5>
                            }
                            <h5>Category</h5>
                            <h5 className="mb-2 text-muted">{Object.keys(eventTypeMap)[Object.values(eventTypeMap).indexOf(event.type)]}</h5>
                            <h5>Days of Occurance</h5>
                            <h5 className="mb-2 text-muted">
                              {event?.weekdays?.map((day, indx) => {
                                const suffix = indx == event.weekdays.length - 1 ? "" : ", "
                                return Object.keys(weekdayMap)[Object.values(weekdayMap).indexOf(day)] + suffix
                              })
                              }
                            </h5>
                            <h5>Start & End Times</h5>
                            <h5 className="mb-2 text-muted">
                              {new Date(event.startAt).toLocaleString("en-US")} - {new Date(event.endAt).toLocaleString("en-US")}
                            </h5>
                          </Card.Body>
                        </Card>
                      </Accordion.Body>
                    </Accordion.Item>
                  )
                })
              }
            </Accordion>
        </div>
        <footer>
          <center>
           Lokel LLC © 2021-22
          </center>
        </footer>
        <Modal show={modal} onHide={() => hideModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Create Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              formType !== "location" ?
              <Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Control
                   type={"text"}
                   placeholder={"Title"}
                   onChange={(e) => updateField(e.target.value, "title")}
                   value={post.title}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Control
                   type={"text"}
                   placeholder={"Address"}
                   onChange={(e) => search(e.target.value)}
                   value={post.address ? post.address : query}
                  />
                  <Form.Text className="text-muted">
                    The address where the experience will be held
                  </Form.Text>
                </Form.Group>
                <div>
                  {
                    googleQuery.length > 0 && post.address == "" &&
                    googleQuery.map((pred) => {
                      return (
                        <>
                          <h5
                           className={styles.address_panel}
                           onClick={() => updateField(pred.description, "address")}
                          >
                           {pred.description}
                          </h5>
                          <hr/>
                        </>
                      )
                    })
                  }
                </div>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Control
                   type={"text"}
                   placeholder={"Description"}
                   onChange={(e) => updateField(e.target.value, "description")}
                   value={post.description}
                  />
                </Form.Group>
                <h4>Links</h4>
                {
                  post?.links?.length > 0 &&

                  post.links.map((link, indx) => {

                    return (
                      <Form.Group className="mb-3" controlId="links">
                        <Form.Control
                         type={"text"}
                         placeholder={"Enter a valid link"}
                         value={posts[indx]}
                         onChange={(e) => {

                           let newLinks = Array.from(post.links)

                           newLinks[indx] = e.target.value

                           updateField(newLinks, "links")
                         }}
                        />
                      </Form.Group>
                    )
                  })
                }
                {
                  post.links < 2 &&
                  <PlusCircle size={18} className={styles.icon} onClick={() => {
                    if(post?.links?.length < 2) {
                      const newArr = Array.from(post.links)
                      newArr.push("")
                      dispatch({ type: "UPDATE_FIELD", field: { links: newArr } })
                    }
                    else {
                      setMsg("You can have a maximum of 2 links!")
                    }
                  }}/>
                }
                <Form.Group className="mb-3" controlId="link">
                  <Form.Select value={post.type} onChange={(e) => updateField(e.target.value, "type")}>
                    {
                      eventTypes.map((type) => <option>{type}</option>)
                    }
                  </Form.Select>
                  <Form.Text className="text-muted">
                    The category into which your experience best fits
                  </Form.Text>
                </Form.Group>
                <h4>Days of Occurance</h4>
                <Form.Group className="mb-3" controlId="occurances">
                  {
                    occDays.map((day) => {

                      return (
                        <Form.Check
                         id={day}
                         type="radio"
                         label={day}
                         checked={post.weekdays.includes(day)}
                         inline
                         onChange={(e) => handleWeekdays(e)}
                         onClick={(e) => handleWeekdays(e, "off")}
                        />
                       )
                    })
                  }
                </Form.Group>
                <h4>Start & End Times</h4>
                <Row>
                <input
                 type="datetime-local"
                 id="start-time"
                 name="meeting-time"
                 value={post.startAt}
                 onChange={(e) => updateField(e.target.value, "startAt")}
                 />
                 <input
                  type="datetime-local"
                  id="end-time"
                  name="meeting-time"
                  value={post.endAt}
                  onChange={(e) => updateField(e.target.value, "endAt")}
                  />
                </Row>
              </Form>
              :
              <div>
                <h4>Location (drag set precise location)</h4>
                <ReactMapGL
                  {...modalViewport}
                  onViewportChange={nextViewport => setModalViewport(nextViewport)}
                  mapboxApiAccessToken={"pk.eyJ1IjoibG9rZWwiLCJhIjoiY2thdm1meGZ1MTA1MDJ5b2Mydjh5dGx1dyJ9.noZVSQqdjHFatcTJcLUk7A"}
                  mapStyle={"mapbox://styles/lokel/ckbbguxgw08mv1ipbeym55gn6"}
                >
                  <Marker longitude={modalViewport.longitude} latitude={modalViewport.latitude} anchor="bottom">
                    <h4>📍</h4>
                  </Marker>
                </ReactMapGL>
              </div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => postXperience()}>
              {
                formType == "" ?
                "Set Location"
                :
                "Post Experience"
              }
            </Button>
          </Modal.Footer>
        </Modal>
        {
          errMsg !== null &&
          <Alert variant="danger" onClose={() => setMsg(null)} dismissible>
            <p className={"mb-0"}>
             {errMsg}
            </p>
          </Alert>
        }
    </>
  )
}


export default Dashboard
