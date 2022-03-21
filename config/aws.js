import React from "react";
import { S3Client } from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
//importing aws token

const S3Config = (poolId) => {


  // creating aws s3 client
  const client = new S3Client({
    region: "us-east-2",
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: "us-east-2" }),
      identityPoolId: poolId
    })
  })


  // returning client
  return client;
};

// exporting
module.exports = {
  S3Config
}
