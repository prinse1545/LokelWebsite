import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Button from "../components/button"
import mapboxgl from "!mapbox-gl"
import styles from "./app.module.css"
import "mapbox-gl/dist/mapbox-gl.css"


mapboxgl.accessToken = "pk.eyJ1IjoibG9rZWwiLCJhIjoiY2thdm1meGZ1MTA1MDJ5b2Mydjh5dGx1dyJ9.noZVSQqdjHFatcTJcLUk7A"

const styleurl = "mapbox://styles/lokel/ckbbguxgw08mv1ipbeym55gn6"


const screenshots = [
  {
    path: "/map.png",
    text: "Surround yourself with activities – it's all there in the Event Map." // (we can change this name later)
  },
  {
    path: "/filters.png",
    text: "Find exactly what you're looking for – whether it's a party or a pastry, we've got you covered."
  },
  {
    path: "/promotion.png",
    text: "Support local businesses – and get some sweet deals (deals not limited to sweet)."
  }
]

const Home = ({ Component, pageProps }) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-88.6377);
  const [lat, setLat] = useState(42);
  const [zoom, setZoom] = useState(9);

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
            <Image
             src={"/logo.png"}
             height={40}
             width={40}
             />
           </div>
           <div className={styles.right}>
            <Button
             link={"/login"}
             text={"Log In"}
            />
            <Button
             link={"/signup"}
             text={"Sign Up"}
            />
           </div>
          </div>
          <center>
            <h1 className={styles.title}>Find your Experience.</h1>
          </center>
          <center className={"blur"}>
            <h1>Lokel puts the social back in social media. Broadcast your event, your business, or just what's around you.</h1>
            <div className={styles.screenshots_container}>
              {
                screenshots.map((shot) => (
                  <div className={styles.screenshot}>
                   <Image
                    src={shot.path}
                    quality={100}
                    height={500}
                    width={250}
                    />
                   <h3>{shot.text}</h3>
                  </div>
                ))
              }
            </div>
            <h2 className={styles.screenshot_call}>
            Whether you're an interested customer, a downtown frequent flier or simply looking for a spontaneous experience, it's all there – just open the app and see hundreds of activities
            at your fingertips. I think we could reword this a bit.
            </h2>
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


export default Home
