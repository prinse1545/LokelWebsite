import React, { useEffect, useRef, useState, useContext } from "react"
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button, Alert } from "react-bootstrap"
import Form from 'react-bootstrap/Form'
import UtilityContext from "./config/utility"
import styles from "./app.module.css"
import { S3Config } from "./config/aws"
import { PutObjectCommand } from "@aws-sdk/client-s3";

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

const s3 = S3Config()

const Profile = ({ Component, pageProps }) => {
  const { user, userId, auth, signout, setCookie, updateField } = useContext(UtilityContext)
  const [currEmail, setCurrEmail] = useState("");
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [profile, setProfile] = useState("")
  const [newProfileExists, setNewProfileExists] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [imageBase, setImageBase] = useState("")
  const [errMsg, setMsg] = useState(null);
  const [changedInfo, setChangedInfo] = useState(false)
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
        setProfile(user.profile);
      }
    }, [user]
  )

  const getProfilePicture = (profileLink) => {
    `https://verbindung.s3.us-east-2.amazonaws.com/users/${profileLink}/$normal.png`
  }

  const setProfilePicture = (image) => {
    console.log("uploading...")
    //upload to s3, get link
        // uploading new picture to aws
        const res = s3.send(
          new PutObjectCommand({
            Bucket: "verbindung",
            Key: "preprocess/users/" + user.profile + ".png",
            Body: atob(imageBase)
          })
        );
    setProfile(user.profile)

  }

  function processImage(event){
    console.log("process image triggered")
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    var reader = new FileReader();
    setFileUrl(imageUrl)
    reader.readAsDataURL(imageFile)
    setImageBase(reader.result)
    setNewProfileExists(true)
 }

  const updateProfile = () => {
      //update email and password if changed
      if(username !== "" && username !== user.username) {
        setChangedInfo(true)
        updateUser({ variables: { id: userId, data: { username: username } } }).then((data) => updateFieldCookies(data.data.updateUser)).catch((err) => {setMsg(err.message);console.log(JSON.stringify(err)); setChangedInfo(false)})
      }

      if(currEmail !== "" && currEmail !== user.email) {
          setChangedInfo(true)
          updateUser({ variables: { id: userId, data: { email: currEmail, role: "BUSINESS" } } }).then((data) => updateFieldCookies(data.data.updateUser)).catch((err) => {setMsg(err.message);console.log(JSON.stringify(err)); setChangedInfo(false)})
      }

      if(password !== "") {
          setChangedInfo(true)
          updateUser({ variables: { id: userId, data: { password: password } } }).then((data) => updateFieldCookies(data.data.updateUser)).catch((err) => {setMsg(err.message);console.log(JSON.stringify(err)); setChangedInfo(false)})
        }

      if(newProfileExists) {
        console.log("we made a profile photo, here it is: ", profile)
        setProfilePicture(imageBase) //upload picture to AWS
        setChangedInfo(true)
        updateUser({ variables: { id: userId, data: { profile: profile } } }).then((data) => updateFieldCookies(data.data.updateUser)).catch((err) => {setMsg(err.message);console.log(JSON.stringify(err)); setChangedInfo(false)})
        setNewProfileExists(false);
    }
  }

  const userEnteredInput = () => { //only show update button if user has entered text
      return ((password !== "" && password.length > 5) || (currEmail !== "" && password === "") || (username !== "" && password === "") || newProfileExists)
  }

  console.log(changedInfo, " is changed info")

  return (
    <>
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
                {changedInfo && <h1 style = {{color: "green"}}>Your profile was updated.</h1>}
                  <h1>My Profile</h1>
                  <h3>Current photo</h3>
                  <img src={getProfilePicture(profile)} alt = "You don't have a photo yet." height="640px" width="480px"/>
                  <h3>Change my photo</h3>
                  <img src={fileUrl} height="640px" width="480px" alt = "Upload a photo?"/>
                    <input type="file" accept="image/*" onChange={processImage}></input>
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
