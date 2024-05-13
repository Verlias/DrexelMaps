import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import kormanFloor1 from '../assets/floor_layouts/korman_floor1.svg';
import kormanFloor2 from '../assets/floor_layouts/korman_floor2.svg';
import mainFloor1 from '../assets/floor_layouts/main_floor1.svg';
import mainFloor2 from '../assets/floor_layouts/main_floor2.svg';
import styles from "./Layout-Page.module.css";

const LayoutMain = () => {
    const [svgs, setSvgs] = useState([]);
    const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
    const [building, setBuilding] = useState("");
    const [roomnumber, setRoomnumber] = useState("");
    const [floorplanAvailable, setFloorplanAvailable] = useState(false);
    const [loadingBuilding, setLoadingBuilding] = useState(true);
    const [loadingRoom, setLoadingRoom] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [manualInput, setManualInput] = useState(false);

    useEffect(() => {
        if (building === "korman center") {
            setSvgs([kormanFloor1, kormanFloor2]);
            setFloorplanAvailable(true);
        }
        else if (building === "main building") {
            setSvgs([mainFloor1, mainFloor2]);
            setFloorplanAvailable(true);
        }
        else {
            setFloorplanAvailable(false);
            console.log("No Floorplans Available!");
        }

        // Prevents fetch when manually changing building
        if (!manualInput) {
            fetchBuilding();
            fetchRoomnumber();
            console.log(roomnumber);
        }
    }, [building]);

    // Gets the end destination building
    const fetchBuilding = async () => {
        try {
            const response = await axios.get('http://localhost:3000/destinations');
            // Building is stored with key de on backend
            setBuilding(response.data.de.toLowerCase());
            setLoadingBuilding(false);
        } catch (error) {
            console.error("Error fetching building:", error);
            setLoadingBuilding(false);
        }
    };

    const fetchRoomnumber = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/roomnum');
            // Building is stored with key de on backend
            setRoomnumber(response.data.roomnum.toLowerCase());
            setLoadingRoom(false);
        } catch (error) {
            console.error("Error fetching building:", error);
            setLoadingRoom(false);
        }
    };

    const switchSvg = (index) => {
        setCurrentSvgIndex(index);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setManualInput(true);
        setBuilding(inputValue);
        setInputValue(""); // Clear the input field after submission
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {floorplanAvailable ? (
                <>
                    {svgs.map((item, index) => (
                        <button className={styles.LayoutButton} key={index} onClick={() => switchSvg(index)}>{index}</button>
                    ))}
                    <img src={svgs[currentSvgIndex]} alt={`Floor ${currentSvgIndex + 1}`} />

               
                    

                </>
            ) : (
                <p>No Available Floorplan</p>
            )}
            <form onSubmit={handleSubmit}>
                <label>
                    Enter building name:
                    <input type="text" value={inputValue} onChange={handleChange} />
                </label>
                <button className={styles.LayoutButton} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LayoutMain;
