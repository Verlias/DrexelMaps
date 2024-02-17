import React from "react";
import styles from "./Map-Page.module.css";

function MapMain(){

    return(
        <>
            <div className={styles.MapContentContainer}>
            <p id="long">Longitude</p>
            <p id="lat">Latitude</p>
            <h1 className={styles.MapHeadline}>Our Interactive Map</h1>
            <div className={styles.MapContainer}>API</div>
            </div>
        </>
    );
};

export default MapMain