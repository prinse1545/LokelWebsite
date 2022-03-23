// Filename: _app.js
// Description: This file serves as the entrypoint
// to the website
//
// Lokel LLC.
//
// Copyright 2020-2022
//
// 2021-12-17

// importing tools
import React, { useReducer, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloConfig } from "../config/apollo";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import aes from "aes-js";
import UtilityContext from "../config/utility";
import { configAES } from "../config/crypto";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css"


const App = ({ Component, pageProps }) => {

  const [state, dispatch]= useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "UPDATE_FIELD":
          return Object.assign({}, prevState, action.field);
        default:
          return prevState;
      }
    },
    {
      auth: null,
      userId: "",
      user: null
    }
  )

  useEffect(() => {
    const tok = getCookie("o")
    const id = getCookie("e")
    const user = getCookie("u")
    if(tok !== undefined) {
      utilityFunctionality.updateField({ auth: tok })
    }

    if(id !== undefined) {
      utilityFunctionality.updateField({ userId: id })
    }

    if(user !== undefined) {
      utilityFunctionality.updateField({ user: JSON.parse(user) })
    }
  }, [])

  const router = useRouter()

  // creating functionality that needs to be used in other functions outside of
  // object because the this keyword isn't working

  const setCookie = (key, value) => {
    // Function: setCookie, a function that encrypts a value and sets the cookie
    //
    // Parameter(s):
    //
    //   self explanatory
    //
    // Return Value(s):
    //
    //   none

    const aesCtr = configAES(process.env.NEXT_PUBLIC_KEY)

    const encryptedVal = aesCtr.encrypt(aes.utils.utf8.toBytes(value));

    // need to encrypt
    Cookies.set(key, aes.utils.hex.fromBytes(encryptedVal))
  }

  const getCookie = (key) => {
    // Function: getCookie, a function that gets a cookie with the desired key
    //
    // Parameter(s):
    //
    //   self explanatory
    //
    // Return Value(s):
    //
    //   none

    const aesCtr = configAES(process.env.NEXT_PUBLIC_KEY)

    if(Cookies.get(key) === undefined) {
      return
    }
    // need to decrpyt
    const encryptedVal = aes.utils.hex.toBytes(Cookies.get(key))

    const decryptedVal = aes.utils.utf8.fromBytes(aesCtr.decrypt(encryptedVal))

    return decryptedVal
  }

  const updateField = (field) => {
    // Function: updateField, a function that updates a field in the reducer
    //
    // Parameter(s):
    //
    //   field: an object containing the field that needs to be modified as the
    //   key and the new value to that key as the value
    //
    // Return Value(s):
    //
    //   none
    dispatch({ type: "UPDATE_FIELD", field: field })
  }


  // functions for utility context
  const utilityFunctionality = {
    setCookie: setCookie,
    getCookie: getCookie,
    updateField: updateField,
    signin: (token, user) => {
      // Function: signin, a function that signs in the user
      //
      // Parameter(s):
      //
      //   token: the authentication token
      //
      // Return Value(s):
      //
      //   none

      setCookie("o", token) // saving cookie for persitance
      setCookie("e", user.id)
      setCookie("u", JSON.stringify(user))
      updateField({ auth: token })
      updateField({ userId: user.id })
      updateField({ user: user })
      router.push("/dashboard")

    },
    signout: () => {
      // Function: signout, a function that signs the user out
      //
      // Parameter(s):
      //
      //   none
      //
      // Return Value(s):
      //
      //   none

      Cookies.remove("o")
      Cookies.remove("e")
      Cookies.remove("u")

      updateField({ auth: null })
    },
    auth: state.auth,
    userId: state.userId,
    user: state.user
  }

  const client = apolloConfig(state.auth)

  return (
    <>
      <Head>
       <meta name="viewport" content="width=device-width, initial-scale=1"/>
       <link rel="icon" href="/logo.png" />
      </Head>
      <ApolloProvider client={client}>
        <UtilityContext.Provider value={utilityFunctionality}>
          <Component {...pageProps} />
        </UtilityContext.Provider>
      </ApolloProvider>
    </>
  )
}

export default App
