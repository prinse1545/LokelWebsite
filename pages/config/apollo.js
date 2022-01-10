// Filename: apollo.js
// Description: This file implements the apollo client
// configuration for the webite
//
// Lokel LLC.
//
// Copyright 2020-2022
//
// 2022-01-02

// importing tools
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:6535",
    cache: new InMemoryCache(),
});

export default client;
