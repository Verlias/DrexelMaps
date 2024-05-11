import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

import styles from "./Map-Page.module.css";

function MapMain() {
    const [data, setData] = useState({});
    const [roomnumber, setRoomnumber] = useState("");

    useEffect(() => {
        // Fetch data from the backend
        const fetchData = async () => {
            try {
                // Make a GET request to fetch data from localhost:3000/destinations/
                const response = await axios.get("http://localhost:3000/destinations/");
                // Update the state with the fetched data
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

        const script = document.createElement('script');
        script.src = "src/scripts/mapscript.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/roomnum', {
                classNumber: roomnumber
            });
            console.log(response.data);

        } catch (error) {
            console.error("Error submitting roomnumber:", error);
        }
    };

    const handleToggleConnections = async (event) => {
        toggleconnections();
    };

    return (
        <>
            <canvas id="mapCanvas"></canvas>
            <div style={{ position: "absolute", bottom: 0 }} id="destinationstart">{data.ds}</div>
            <div style={{ position: "absolute", bottom: "15px" }} id="destinationend">{data.de}</div>
            <form onSubmit={handleSubmit} style={{ position: "absolute", bottom: "40px", left: "40px" }}>
                <label htmlFor="classNumber">Class Number:</label>
                <input id="classNumber" name="classNumber" required onChange={(e) => setRoomnumber(e.target.value)} />
                <button className="submit" type="submit" style={{ marginTop: "10px" }}>Submit</button>
            </form>
            <button className="submit" type="submit" onClick={handleToggleConnections} style={{ position: "absolute", bottom: "15px", right: "15px" }}>Toggle Connections</button>
        </>
    );
};

export default MapMain;
