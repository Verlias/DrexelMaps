import React, { useState, useEffect } from "react";
import axios from "axios";
import SvgComponent from './SvgComponent.jsx';
import styles from "./Layout-Page.module.css";
import Header from "../Components/Header.jsx"

const Layout = () => {
    const [building, setBuilding] = useState("");
    const [roomnumber, setRoomnumber] = useState("");
    const [floor, setFloor] = useState(""); 
    const [loadingBuilding, setLoadingBuilding] = useState(true);
    const [loadingRoom, setLoadingRoom] = useState(true);
    const [inputValues, setInputValues] = useState({ building: "", roomnumber: "" });
    const [manualInput, setManualInput] = useState(false);

    useEffect(() => {
        // Prevents fetch when manually changing building
        if (!manualInput) {
            fetchBuilding();
            fetchRoomnumber();
        }
    }, [manualInput, floor, building, roomnumber]);

    // Gets the end destination building
    const fetchBuilding = async () => {
        try {
            const response = await axios.get('http://localhost:3000/destinations');
            // Building is stored with key de on backend
            setBuilding(response.data.de.toLowerCase());
            setLoadingBuilding(false);
        } catch (error) {
            setLoadingBuilding(false);
        }
    };

    const fetchRoomnumber = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/roomnum');
            const newRoomnum = response.data.roomnum.toString();
            setRoomnumber(newRoomnum);
            setFloor(newRoomnum.charAt(0));
            setLoadingRoom(false);
        } catch (error) {
            setLoadingRoom(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setManualInput(true);
        setBuilding(inputValues.building);
        const newRoomnum = inputValues.roomnumber.toString()
        setRoomnumber(newRoomnum);
        setFloor(newRoomnum.charAt(0));
        setInputValues({ building: "", roomnumber: "" }); // Clear the input fields after submission
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    return (
        <>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <div className={styles.SvgComponentContainer}>
                    {<SvgComponent id={roomnumber} building={building} floor={floor} />}
                </div>
                

                <form className={styles.FormLayout} onSubmit={handleSubmit}>
                    <label>
                        Enter building name:
                    <input
                      type="text"
                      name="building"
                      value={inputValues.building}
                      onChange={handleChange}
                      required
                    />
                    </label>
                    <label>
                        Roomnumber
                    <input
                      type="text"
                      name="roomnumber"
                      value={inputValues.roomnumber}
                      onChange={handleChange}
                    />
                    </label>
                    <button className={styles.LayoutButton} type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default Layout;