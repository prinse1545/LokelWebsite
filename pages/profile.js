import React, { useEffect, useRef, useState, useContext } from "react"
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button, Alert } from "react-bootstrap"
import Form from 'react-bootstrap/Form'
import UtilityContext from "./config/utility"
import styles from "./app.module.css"

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!,
    $data: JSON!,
  ) {
    updateUser(
      id: $id,
      data: $data,
    ) {
      username
      email
      profile
    }
  }
`;

const Profile = ({ Component, pageProps }) => {
  const { user, userId, auth, signout, setCookie, updateField } = useContext(UtilityContext)
  const [currEmail, setCurrEmail] = useState("");
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [profile, setProfile] = useState("")
  const [errMsg, setMsg] = useState(null);
  const router = useRouter()

  const [updateUser, { data, error, loading }] = useMutation(UPDATE_USER)

  const updateFieldCookies = (newUser) => {
    updateField(newUser)
    setCookie("u", JSON.stringify(newUser))
  }

  useEffect(
    () => {
      if(user) {
        setCurrEmail(user.email);
        setUsername(user.username);
        setProfile(user.username);
      }
    }, [user]
  )

  const updateProfile = () => {
      //update email and password if changed
      if(username !== "" && username !== user.username) {
        updateUser({ variables: { id: userId, data: { username: username } } }).then((data) => updateFieldCookies(data.data.updateUser)).catch((err) => {setMsg(err.message);console.log(JSON.stringify(err))})
      }

      if(currEmail !== "" && currEmail !== user.email) {
          updateUser({ variables: { id: userId, data: { email: currEmail, role: "BUSINESS" } } }).then((data) => updateFieldCookies(data.data.updateUser)).catch((err) => {setMsg(err.message);console.log(JSON.stringify(err))})

      }

      if(password !== "") {
          updateUser({ variables: { id: userId, data: { password: password } } }).then((data) => updateFieldCookies(data.data.updateUser)).catch((err) => {setMsg(err.message);console.log(JSON.stringify(err))})
      }

      if(profile !== "") {
        updateUser({ variables: { id: userId, data: { profile: profile } } }).then((data) => updateFieldCookies(data.data.updateUser)).catch((err) => {setMsg(err.message);console.log(JSON.stringify(err))})
    }
  }

  const userEnteredInput = () => { //only show update button if user has entered text
      return (password !== "" && password.length > 5) || (currEmail !== "" && password === "") || (username !== "" && password === "") 
  }


  return (
    <>
      <div>
          <div>
        <div className={"row"}>
          <div className={styles.left}>
          <Link href={"/home"}>
            <Image
             src={"/logo.png"}
             height={40}
             width={40}
             />
           </Link>
           </div>
           <div className={styles.right}>
            {
              auth === null ?
              <>
                <Button variant="primary" type="submit" onClick={() => router.push("/login")}>
                  Log In
                </Button>
                <Button variant="secondary" type="submit" onClick={() => router.push("/signup")}>
                  Sign Up
                </Button>
              </>
              :
              <>
                <Button variant="primary" type="submit" onClick={() => router.push("/dashboard")}>
                  Dash
                </Button>
                <Button variant="secondary" type="submit" onClick={() => signout()}>
                  Sign Out
                </Button>
              </>
            }
           </div>
          </div>
            </div>
            <div>
                <br/>
            <br/>
            {
                auth === null ? 
                <>
                <br/>
                  <h1>My Profile</h1>
                  <h2>Sorry, you're not logged in. Log in or sign up?</h2>
                </>
                :
                <>
                <br/>
                  <h1>My Profile</h1>
                  <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Change your username</Form.Label>
                        <Form.Control type="email" placeholder={username} onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Change your email</Form.Label>
                        <Form.Control type="email" placeholder={currEmail} onChange={(e) => setCurrEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Change your password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    </Form>
                    {
                        userEnteredInput() ?                    
                        <Button variant="primary" type="submit" onClick={() => {updateProfile()}}>
                        Update my profile
                        </Button>
                        :
                        <h3>Change your information before updating your profile.</h3>
                    }
                </>
            }
            </div>
        </div>
        <br/>
        <footer>
          <center>
           Lokel LLC © 2021
          </center>
        </footer>
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


export default Profile
