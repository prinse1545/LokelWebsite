// Filename: signup.js
// Description: This file implements the signup screen
// for businesses to sign up
//
// Lokel LLC.
//
// Copyright 2020-2022
//
// 2021-12-17

// importing tools
import React, { useReducer, useState, useEffect, useContext } from "react"
import Link from "next/link"
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router"
import { Form, Button, Alert } from "react-bootstrap"
import { ArrowLeft } from "react-bootstrap-icons";
import UtilityContext from "../config/utility"
import { S3Config } from "../config/aws"
import { PutObjectCommand } from "@aws-sdk/client-s3";
import styles from "./app.module.css"


const SIGN_UP = gql`

  mutation signup(
    $username: String!,
    $email: String,
    $role: Role!,
    $private: Boolean!
    $acceptedTerms: Boolean!
    $password: String!
    ) {
    signup(
      username: $username,
      email: $email,
      role: $role,
      private: $private,
      acceptedTerms: $acceptedTerms,
      password: $password
    ) {
      token
      user {
        id
        profile
        email
        username
        verified
      }
    }
  }

`;

const SignUp = (props) => {

  const { signin } = useContext(UtilityContext)

  const [errMsg, setMsg] = useState(null)
  const [user, dispatch] = useReducer(
    (prevUser, action) => {
      switch (action.type) {
        case "UPDATE_FIELD":
          return Object.assign({}, prevUser, action.field)

        default:
          return prevUser
      }
    },
    {
      "email": "",
      "username": "",
      "password": "",
      "confirmPassword": "",
      "acceptedTerms": false,
      "profile": ""
    }
  )

  const [signup, { data, error, loading }] = useMutation(SIGN_UP)

  const router = useRouter()
  const s3 = S3Config(process.env.NEXT_PUBLIC_AWS_ID_POOL)

  useEffect(async () => {
    if(data !== undefined && data?.signup?.token !== null) {
      try {

        const blob = await fetch(user.profile)

        // uploading new picture to aws
        const res = await s3.send(
          new PutObjectCommand({
            Bucket: "verbindung",
            Key: "preprocess/users/" + data.signup.user.profile + ".png",
            Body: await blob.blob()
          })
        );
      }
      catch (e) {
        setMsg("Something went wrong with uploading your profile picture!")
      }

      signin(data.signup.token, data.signup.user)
    }
  }, [data])


  const updateField = (val, field) => {

    const updateObj = {}
    updateObj[field] = val
    dispatch({ type: "UPDATE_FIELD", field: updateObj })
  }

  const handleSignup = () => {

    if(user.password !== user.confirmPassword) {
      setMsg("It looks like the two passwords don't match!")
      return
    }

    if(user.profile === "") {
      setMsg("Please Select a profile picture!")
      return
    }
    // creating new user
    const newUser = Object.assign({}, {}, user)
    // deleting confirm password field
    delete newUser.confirmPassword
    delete newUser.profile

    signup({ variables: Object.assign(newUser, { private: false, role: "BUSINESS" }) }).catch((err) => {setMsg(err.message); console.log(err.message)})

  }
  const processImage = (event) => {

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      updateField(reader.result, "profile")
    })

    reader.readAsDataURL(event.target.files[0])
  }

  return (
    <center>
      <div className={styles.left}>
        <Link href={"/"}>
          <ArrowLeft
           height={40}
           width={40}
           />
         </Link>
       </div>
      <div className={"auth_form_container"}>
       <h1>Sign Up</h1>
       <Form>
         <Form.Group className="mb-3" controlId="email">
           <Form.Control
            type={"text"}
            placeholder={"Email address"}
            value={user.email}
            onChange={(e) => updateField(e.target.value, "email")}
            onKeyUp={(e) => console.log(e.charCode)}
           />
           <Form.Text className="text-muted">
             We'll never share your email with anyone else.
           </Form.Text>
         </Form.Group>
         <Form.Group className="mb-3" controlId="username">
           <Form.Control
            type={"text"}
            placeholder={"Username"}
            value={user.username}
            onChange={(e) => updateField(e.target.value, "username")}
           />
           <Form.Text className="text-muted">
             The username you want other users to see
           </Form.Text>
         </Form.Group>
         <Form.Group>
           <Form.Control type="file" accept="image/*" onChange={(e) => processImage(e)} />
           <Form.Text className="text-muted">
             Your Profile Picture (Which will appear in the app)
           </Form.Text>
         </Form.Group>
         <br />
         <Form.Group className="mb-3" controlId="password">
           <Form.Control
            type={"password"}
            placeholder={"Password"}
            value={user.password}
            onChange={(e) => updateField(e.target.value, "password")}
           />
         </Form.Group>
         <Form.Group className="mb-3" controlId="confirmPassword">
           <Form.Control
            type={"password"}
            placeholder={"Confirm password"}
            value={user.confirmPassword}
            onChange={(e) => updateField(e.target.value, "confirmPassword")}
           />
         </Form.Group>
         <Form.Group className="mb-3" controlId="terms">
           <Form.Check
            type="checkbox"
            label="By checking this I agree to these terms and conditions"
            onChange={(e) => updateField(e.target.checked, "acceptedTerms")} />
         </Form.Group>
       </Form>
       <Button variant="primary" type="submit" onClick={() => handleSignup()}>
         Sign Up
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

export default SignUp
