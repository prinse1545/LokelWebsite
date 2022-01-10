// Filename: login.js
// Description: This file implements the signup screen
// for businesses to sign up
//
// Lokel LLC.
//
// Copyright 2020-2022
//
// 2021-12-17

// importing tools
import React, { useState, useEffect, useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useLazyQuery, gql } from "@apollo/client";
import { Form, Button, Row, Alert } from "react-bootstrap"
import UtilityContext from "./config/utility"


const LOG_IN = gql`

query login($email: String!, $password: String!) {
  loginEmail(email: $email, password: $password) {
    token
  }
}

`;

const LogIn = (props) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { data, loading, error }] = useLazyQuery(LOG_IN)
  const [errMsg, setMsg] = useState(null)

  const { signin } = useContext(UtilityContext)

  const router = useRouter()


  useEffect(() => {
    if(error !== undefined) {
      setMsg(error.message)
    }
  }, [error])

  useEffect(() => {
    if(data !== undefined && data?.loginEmail?.token !== null) {
      signin(data.loginEmail.token)
    }
  }, [data])

  return (
    <center>
      <div className={"auth_form_container"}>

      <h1>Log In</h1>

       <Form>
         <Form.Group className="mb-3" controlId="email">
           <Form.Control
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           />
           <Form.Text className="text-muted">
             The email you signed up with
           </Form.Text>
         </Form.Group>

         <Form.Group className="mb-3" controlId="password">
           <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           />
         </Form.Group>

       </Form>

       <Button
       variant="primary"
       type="submit"
       onClick={() => login({ variables: { email: email, password: password } })}
       >
         Log In
       </Button>
      </div>
      {
        errMsg !== null &&
        <Alert variant="danger" onClose={() => setMsg(null)} dismissible>
          <p className={"mb-0"}>
           {errMsg}
          </p>
        </Alert>
      }
    </center>
  )
}

export default LogIn
