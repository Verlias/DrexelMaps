import React, { useEffect } from "react";
import styles from "./Map-Page.module.css";

function MapMain(){
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "src/scripts/mapscript.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script)
        }
    })

    // Check if geolocation is available
    if ("geolocation" in navigator) {
        // Request current position
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } 
    else {
        console.log("Geolocation is not supported by this browser.");
    }

    // Success callback function
    function successCallback(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        document.getElementById("long").innerHTML = longitude;
        document.getElementById("lat").innerHTML = latitude;
        console.log("latitude: " + latitude);
        console.log("longitude: " + longitude);
    }

    // Error callback function
    function errorCallback(error) {
        document.getElementById("long").innerHTML = "Location";
        document.getElementById("lat").innerHTML = "Not Recieved";
        console.error("Error getting user's location:", error);
    }

    return(
        <>
            <div className={styles.MapContentContainer}>
            <p id="long">Longitude</p>
            <p id="lat">Latitude</p>
            <h1 className={styles.MapHeadline}>Our Interactive Map</h1>
            <div className={styles.MapContainer}>
                <canvas id="mapCanvas"></canvas>
            </div>
            </div>
        </>
    );
};

export default MapMain