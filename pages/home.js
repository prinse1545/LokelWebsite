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
    text: "Young adults hop on our mobile app looking for exclusive experiences"
  },
  {
    path: "/filters.png",
    text: "In that process they choose filters to narrow their search"
  },
  {
    path: "/promotion.png",
    text: "Your promotions turn from annoying ads into useful content that the user is looking for"
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
            <h1 className={styles.title}>Advertise to young adults looking for your products or services in your proximity and gain communication with a loyal customer base</h1>
          </center>
          <center className={"blur"}>
            <h1>How it works</h1>
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
            Finally if the user is intrigued with your promotion they can subscribe to receive notifications regarding future promotions,
            giving your business a group of interested future customers to interact with, and it's all free!
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
