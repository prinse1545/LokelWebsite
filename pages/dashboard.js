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
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "react-bootstrap"
import mapboxgl from "!mapbox-gl"
import styles from "./app.module.css"
import "mapbox-gl/dist/mapbox-gl.css"


mapboxgl.accessToken = "pk.eyJ1IjoibG9rZWwiLCJhIjoiY2thdm1meGZ1MTA1MDJ5b2Mydjh5dGx1dyJ9.noZVSQqdjHFatcTJcLUk7A"

const styleurl = "mapbox://styles/lokel/ckbbguxgw08mv1ipbeym55gn6"


const Dashboard = ({ Component, pageProps }) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-88.6377);
  const [lat, setLat] = useState(42);
  const [zoom, setZoom] = useState(9);

  const router = useRouter()

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: styleurl,
    center: [lng, lat],
    zoom: zoom
    });
  },[]);

  return (
    <>
      <div>
        <div ref={mapContainer} className={styles.map_container} />
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
          </div>
          <center>
            <h1 className={styles.title}>Find your Dashboard.</h1>
          </center>
        </div>
        <footer>
          <center>
           Lokel LLC © 2021
          </center>
        </footer>
    </>
  )
}


export default Dashboard
