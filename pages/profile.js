import React, { useEffect, useRef, useState, useContext } from "react"
import { useLazyQuery, gql } from "@apollo/client";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "react-bootstrap"
import Form from 'react-bootstrap/Form'
import UtilityContext from "./config/utility"
import styles from "./app.module.css"
const { auth } = useContext(UtilityContext)

const CHANGE_USERNAME = gql`
  mutation changeUsername(
    $username: String!,
  ) {
    changeUsername(
      username: $username,
    ) {
      username
    }
  }
`;


const CHANGE_EMAIL = gql`
mutation changeEmail(
  $email: String!,
) {
  changeEmail(
    email: $email,
  ) {
    email
  }
}
`;


const CHANGE_PASSWORD = gql`
mutation changePassword(
  $password: String!,
) {
  changeUsername(
    password: $password,
  ) {
    username
  }
}
`;

const GET_USERNAME_EMAIL_PASSWORD = gql`
  query userInfo($email: String!) {
      getUserInfo(email: $email) {
          user {
              username
              email
          }
      }
  }
`

const Home = ({ Component, pageProps }) => {
  const { auth, signout } = useContext(UtilityContext)
  const [currEmail, setCurrEmail] = useState("");
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const router = useRouter()

  useEffect(() => {
      //get username and email (not password) from query
    const [getUserInfo, { data, loading, error }] = useLazyQuery(GET_USERNAME_EMAIL_PASSWORD)
    getUserInfo({ variables: { email: email } })
    setCurrEmail(data.email)
    setUsername(data.username)
  },[]);

  const updateProfile = () => {
    const [changeEmail, { edata, eerror, eloading }] = useMutation(CHANGE_EMAIL)
    const [changePassword, { pdata, perror, ploading }] = useMutation(CHANGE_PASSWORD)
    const [changeUsername, { udata, uerror, uloading }] = useMutation(CHANGE_USERNAME)

      console.log("updating profile")
      //update email and password if changed
      if(username !== "") {
        console.log("set username in database to ", username)
        changeUsername({ variables: { username: username } })
      }

      if(currEmail !== "") {
          console.log("set email in database to ", currEmail)
          changeEmail({ variables: { email: email } })

      }

      if(password !== "") {
          console.log("set password in database to ", password)
          changePassword({ variables: { password: password } })
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
                        <Form.Label>Your current username</Form.Label>
                        <Form.Control type="email" placeholder={username} onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Your current email</Form.Label>
                        <Form.Control type="email" placeholder={currEmail} onChange={(e) => setCurrEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Change password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    </Form>
                    {
                        userEnteredInput() ?                    
                        <Button variant="primary" type="submit" onClick={() => {updateProfile()}}>
                        Update my profile
                        </Button>
                        :
                        <h3>Enter a new email or password to update your profile.</h3>
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
    </>
  )
}


export default Home
