import React, { useState, useEffect } from "react";
import styles from "./Map-Page.module.css";

function MapMain(){
    const [node, setNode] = useState({
        "name": "",
        "position": [0, 0],
        "connectionsByID": [],
        "connections": [],
        "id": "",
        "heurisitic": 999999,
        "previous": null
    });
    const [mapImage, setMapImage] = useState("")
    const [nodes, setNodes] = useState([]);
    const [startingNode, setStartingNode] = useState("")
    const [endingNode, setEndingNode] = useState("")

    // const zoomInMap = (e) => {
    //     const panSpeed = 15;
    //     switch (e.key) {
    //         case 'ArrowUp':
    //             if (offsetY + panSpeed < 0)
    //                 offsetY += panSpeed;
    //             else
    //                 offsetY = 0;
    //             break;
    //         case 'ArrowDown':
    //             if ((offsetY - panSpeed) - canvas.height > -mapImage.height * scale)
    //                 offsetY -= panSpeed;
    //             break;
    //         case 'ArrowLeft':
    //             if (offsetX + panSpeed < 0)
    //                 offsetX += panSpeed;
    //             else
    //                 offsetX = 0;
    //             break;
    //         case 'ArrowRight':
    //             if ((offsetX - panSpeed) - canvas.width > -mapImage.height * scale)
    //                 offsetX -= panSpeed;
    //             break;
    //     }
    // }

    // // Component mounts
    // useEffect(() => {
    //     //document.addEventListener('keydown', zoomInMap);
    //     // document.addEventListener('keydown', moveMap(e));
        
    //     setMapImage("assets/maps/map3.svg");
    // }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "src/scripts/mapscript.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script)
        }
    });

    return(
        <>
            <h1 className={styles.MapHeadline}>Our Interactive Map</h1>
            <div className={styles.MapContainer}>
                <canvas id="mapCanvas"></canvas>
            </div>
        </>
    );
};

export default MapMain