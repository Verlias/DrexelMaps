import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from "./Input-Page.module.css";
import buildingData from "./building_locations.json";

function InputMain() {
    const containerStartingRef = useRef(null);
    const containerEndingRef = useRef(null);
    const [containerStartingHeight, setStartingContainerHeight] = useState('auto');
    const [containerEndingHeight, setEndingContainerHeight] = useState('auto');
    const navigate = useNavigate();
    const [startingLocationInput, setStartingLocationInput] = useState("");
    const [endingLocationInput, setEndingLocationInput] = useState("");
    const [startingLocationSuggestions, setStartingLocationSuggestions] = useState([]);
    const [endingLocationSuggestions, setEndingLocationSuggestions] = useState([]);
    const [savedClasses, setSavedClasses] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const container = containerStartingRef.current;
        if (container && startingLocationSuggestions.length > 0) {
            const buttonHeight = container.querySelector('button').offsetHeight;
            const maxVisibleButtons = Math.floor(window.innerHeight / buttonHeight / 3);
            const newHeight = Math.min(startingLocationSuggestions.length, maxVisibleButtons) * buttonHeight;
            setStartingContainerHeight(`${newHeight}px`);
        }
        else {
            setStartingContainerHeight("0px");
        }
    }, [startingLocationSuggestions]);

    useEffect(() => {
        const container = containerEndingRef.current;
        if (container && endingLocationSuggestions.length > 0) {
            const buttonHeight = container.querySelector('button').offsetHeight;
            const maxVisibleButtons = Math.floor(window.innerHeight / buttonHeight / 3);
            const newHeight = Math.min(endingLocationSuggestions.length, maxVisibleButtons) * buttonHeight;
            setEndingContainerHeight(`${newHeight}px`);
        }
        else {
            setEndingContainerHeight("0px");
        }
    }, [endingLocationSuggestions]);

    useEffect(() => {
        // Fetch saved classes data
        if (token) fetchClassesData();
    }, []);

    // Run this side code only when the savedClasses state has changed.
    useEffect(() => {
        // If the user is logged in, set starting location and ending location
        // suggestions to unique buildings in the saved classes data.
        if (token){
            setStartingLocationSuggestions(filterClassesData(savedClasses));
            setEndingLocationSuggestions(filterClassesData(savedClasses));
        }
        // If the user is not logged in, set starting location and ending location
        // suggestions to all the buildings in the building_locations.json data.
        else {
            // Fetching building names from building_locations.json JSON data
            const names = buildingData.map(building => building.name).filter(name => name !== 'road').sort();
            setStartingLocationSuggestions(names);
            setEndingLocationSuggestions(names);
        }
    }, [savedClasses])

    // Gets the saved classes
    const fetchClassesData = async () => {
        try {
            // Fetch user saved classes data from the backend
            const response = await axios.get('http://localhost:3000/api/saved');
            // Set the saved classes data in state
            setSavedClasses(response.data);
            console.log(filterClassesData(response.data));
        } catch (error) {
            console.error("Error fetching saved classes:", error);
        }
    };

    // Filter saved class data fetched from /api/saved endpoint by returning
    // an array that only contain unique buildings where the saved classes are located.
    const filterClassesData = (classes) => {
        return [...new Set(classes.map(savedClass => savedClass.building))];
    }

    const handleInputChange = (event, setValue, setSuggestions) => {
        const { value } = event.target;
        setValue(value);

        if (value.trim() === '') {
            setSuggestions(buildingData.map(building => building.name).filter((name) => name !== 'road').sort());
            return;
        }

        const filteredSuggestions = buildingData
            .map(building => building.name)
            .filter((name) => (name.toLowerCase().startsWith(value.toLowerCase())) && (name !== 'road'))
            .sort();
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
                <div ref={containerStartingRef} className={styles.scrollableContainer} style={{ height: containerStartingHeight }} >
                    {startingLocationSuggestions.map((name, index) => (
                        <button key={index} className={styles.autofill} style={{ cursor: "pointer" }} onClick={() => displayNames(name, setStartingLocationInput, setStartingLocationSuggestions)}>
                            <p>{name}</p>
                        </button>
                    ))}
                </div>
                <label htmlFor="enddestination">Ending Class Location:</label>
                <input id="enddestination" name="enddestination" value={endingLocationInput} onChange={(e) => handleInputChange(e, setEndingLocationInput, setEndingLocationSuggestions)} required />
                <div ref={containerEndingRef} className={styles.scrollableContainer} style={{ height: containerEndingHeight }} >
                    {endingLocationSuggestions.map((name, index) => (
                        <button key={index} className={styles.autofill} style={{ cursor: "pointer" }} onClick={() => displayNames(name, setEndingLocationInput, setEndingLocationSuggestions)}>
                            <p>{name}</p>
                        </button>
                    ))}
                </div>
                <button className={styles.submit} type="submit">Submit</button>
            </form>
        </>
    );
}

export default InputMain;
