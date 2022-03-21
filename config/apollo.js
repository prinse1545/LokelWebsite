// Filename: apollo.js
// Description: This file implements the apollo client
// configuration for the webite
//
// Lokel LLC.
//
// Copyright 2020-2022
//
// 2022-01-02

//Importing apollo tools
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { w3cwebsocket as WebSocket } from "websocket";

//Setting up cache
const cache = new InMemoryCache();

const apolloConfig = (token) => {
  // Function: apolloConfig, a function that
  // configures the apollo client.
  //
  // Parameter(s):
  //
  //   token - the authentication token
  //
  // Return Value(s):
  //
  //   the apollo client


  // uri: OS === "android" ? "ws://10.0.2.2:4000/" : "ws://localhost:4000"

  // uri: OS === "android" ? "http://10.0.2.2:4000" : "http://localhost:4000"

  // http://167.172.249.12:6535
  //
  // ws://167.172.249.12:6535

  //test server ip: 18.219.178.150:6535

  //3.15.76.73 is full server

  //creating websocket link
  const wsLink = new WebSocketLink({
    uri: "ws://localhost:6535", // "wss://lokel.xyz/api"
    options: {
      reconnect: true,
      connectionParams: {
          CustomAuthentication: token ? `Bearer ${token}` : ""
      }
    },
    webSocketImpl: WebSocket
  });

  //creating http link
  const httpLink = new HttpLink({
    uri: "http://localhost:6535" // "https://lokel.xyz/api"
  });

  //creating authentication link
  const authLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        CustomAuthentication: token ? `Bearer ${token}` : "",
      }
    });

    return forward(operation);
  })

  //creating client
  const client = new ApolloClient({
    link: split(
      //Splitting operations into queries/mutations to go over http and subscriptions to go over ws
      ({ query }) => {
        //getting operation type
        const { kind, operation } = getMainDefinition(query);
        //returning boolean object
        return (
          kind === "OperationDefinition" && operation === "subscription"
        );
      },
      wsLink,
      authLink.concat(httpLink)
    ),
    cache: cache
  });

  //returning client
  return client;
};

export {
  apolloConfig
};
