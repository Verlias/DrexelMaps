import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from "./Input-Page.module.css";
import buildingData from "./building_locations.json";

function InputMain() {
    const navigate = useNavigate();
    const [startingLocationInput, setStartingLocationInput] = useState("");
    const [endingLocationInput, setEndingLocationInput] = useState("");
    const [startingLocationSuggestions, setStartingLocationSuggestions] = useState([]);
    const [endingLocationSuggestions, setEndingLocationSuggestions] = useState([]);
    
    useEffect(() => {
        // Fetching building names from JSON data
        const names = buildingData.map(building => building.name).filter(name => name !== 'road').sort();
        setStartingLocationSuggestions(names);
        setEndingLocationSuggestions(names);
    }, []);

    const handleInputChange = (event, setValue, setSuggestions) => {
        const { value } = event.target;
        setValue(value);
        if (value.trim() === '') {
            setSuggestions(buildingData.map(building => building.name).filter(name => name !== 'road').sort());
            return;
        }
        const filteredSuggestions = buildingData
            .map(building => building.name)
            .filter(name => name.toLowerCase().startsWith(value.toLowerCase()));
        setSuggestions(filteredSuggestions);
    };

    const displayNames = (value, setValue, setSuggestions) => {
        setValue(value);
        setSuggestions([]);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/input/', {
                startdestination: startingLocationInput,
                enddestination: endingLocationInput
            });
            console.log(response.data); // assuming backend sends some response
            // If you want to navigate after successful submission, uncomment the following line:
            // navigate('/map');
        } catch (error) {
            console.error("Error submitting data:", error);
            // Handle error, show message to user, etc.
        }
    };
    

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="startdestination">Starting Class Location:</label>
                <input id="startdestination" name="startdestination" value={startingLocationInput} onChange={(e) => handleInputChange(e, setStartingLocationInput, setStartingLocationSuggestions)} required />
                <ul className="list1">
                    {startingLocationSuggestions.map((name, index) => (
                        <li key={index} className="list-names1" style={{ cursor: "pointer" }} onClick={() => displayNames(name, setStartingLocationInput, setStartingLocationSuggestions)}>
                            <b>{name}</b>
                        </li>
                    ))}
                </ul>
                <label htmlFor="enddestination">Ending Class Location:</label>
                <input id="enddestination" name="enddestination" value={endingLocationInput} onChange={(e) => handleInputChange(e, setEndingLocationInput, setEndingLocationSuggestions)} required />
                <ul className="list2">
                    {endingLocationSuggestions.map((name, index) => (
                        <li key={index} className="list-names2" style={{ cursor: "pointer" }} onClick={() => displayNames(name, setEndingLocationInput, setEndingLocationSuggestions)}>
                            <b>{name}</b>
                        </li>
                    ))}
                </ul>
                <button className={styles.submit} type="submit">Submit</button>
            </form>
        </>
    );
}

export default InputMain;
