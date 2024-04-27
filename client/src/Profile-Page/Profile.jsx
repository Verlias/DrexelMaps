import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import Header from "../Components/Header";
import buildingData from "./building_locations.json";

function UserDash() {
    const [saveInput, setSaveInput] = useState("");
    const [nicknameInput, setNicknameInput] = useState("");
    const [classNumberInput, setClassNumberInput] = useState("");
    const [saveSuggestions, setSaveSuggestions] = useState([]);

    useEffect(() => {
        // Fetching building names from JSON data
        const names = buildingData.map(building => building.name).filter(name => name !== 'road').sort();
        setSaveSuggestions(names);
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
            const response = await axios.post('http://localhost:3000/api/save/', {
                nickname: nicknameInput,
                building: saveInput,
                roomnumber: classNumberInput
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
            <Header />
            <div class={styles.container}>
                <div className={styles.header}>
                    <img src="profile-pic.jpg" alt="Profile Picture"></img>
                    <h1>Welcome Zacharius</h1>
                </div>
                <div className={styles.content}>
                    <div className={styles.sidebar}>
                        <h2 className={styles.sidebar_h2}>
                            Dashboard
                        </h2>
                        <ul>
                            <li>
                                <Link to="/my-courses">My Courses</Link>
                            </li>
                            <li>
                                <Link to="/recommended">Recommended</Link>
                            </li>
                            <li>
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li><a href="">Log out</a></li>
                        </ul>
                    </div>
                    <div className={styles.profile_info}>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="saveform">Save Class:</label>
                    <input type="text" placeholder="Nickname" value={nicknameInput} onChange={(e) => setNicknameInput(e.target.value)} required />
                    <input type="text" placeholder="Class Number" value={classNumberInput} onChange={(e) => setClassNumberInput(e.target.value)} required />
                    <input id="saveform" name="saveform" value={saveInput} onChange={(e) => handleInputChange(e, setSaveInput, setSaveSuggestions)} required />
                    <ul className="list1">
                        {saveSuggestions.map((name, index) => (
                            <li key={index} className="list-names1" style={{ cursor: "pointer" }} onClick={() => displayNames(name, setSaveInput, setSaveSuggestions)}>
                                <b>{name}</b>
                            </li>
                        ))}
                    </ul>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default UserDash;
