import React, { useEffect, useState, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "react-bootstrap"
import UtilityContext from "./config/utility"
import ReactMapGL from "react-map-gl"
import styles from "./app.module.css"
import "mapbox-gl/dist/mapbox-gl.css"



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

  const { auth, signout } = useContext(UtilityContext)

  const router = useRouter()

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 600,
    latitude: 42,
    longitude: -88.6377,
    zoom: 8
  });

  return (
    <>
      <div>
        <ReactMapGL
          {...viewport}
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapboxApiAccessToken={"pk.eyJ1IjoibG9rZWwiLCJhIjoiY2thdm1meGZ1MTA1MDJ5b2Mydjh5dGx1dyJ9.noZVSQqdjHFatcTJcLUk7A"}
          mapStyle={"mapbox://styles/lokel/ckbbguxgw08mv1ipbeym55gn6"}
          className={styles.map_blur}
        />
        <div className={"row"}>
          <div className={styles.left}>
          <Link href={"/"}>
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
            at your fingertips.
            </h2>
          </center>
        </div>
        <footer>
          <center>
           Lokel LLC © 2021-22
          </center>
        </footer>
    </>
  )
}


export default Home
