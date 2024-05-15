import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import Header from "../Components/Header";
import buildingData from "./building_locations.json";

function UserDash() {
    const containerRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState('auto');
    const [saveInput, setSaveInput] = useState("");
    const [nicknameInput, setNicknameInput] = useState("");
    const [classNumberInput, setClassNumberInput] = useState("");
    const [saveSuggestions, setSaveSuggestions] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [savedClasses, setSavedClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingClasses, setLoadingClasses] = useState(true);

    useEffect(() => {
        const container = containerRef.current;
        if (container && saveSuggestions.length > 0) {
            const buttonHeight = container.querySelector('button').offsetHeight;
            const maxVisibleButtons = Math.floor(window.innerHeight / buttonHeight / 2);
            const newHeight = Math.min(saveSuggestions.length, maxVisibleButtons) * buttonHeight;
            setContainerHeight(`${newHeight}px`);
        }
        else {
            setContainerHeight("0px");
        }
    }, [saveSuggestions]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
        }
    }, []);

    const handleClick = async (e) => {
        // Update formData state with the new value of the changed input field
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/Login');
    };

    useEffect(() => {
        // Fetching building names from JSON data
        const names = buildingData.map(building => building.name).filter(name => name !== 'road').sort();
        setSaveSuggestions(names);
        
        // Fetch user profile data when the component mounts
        fetchProfileData();
        fetchClassesData();
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
            window.location.reload();
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.post('http://localhost:3000/api/deleteclass/', {
                itemId: id
            });
            window.location.reload();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    // Gets the profile data
    const fetchProfileData = async () => {
        try {
            // Fetch user profile data from the backend
            const response = await axios.get('http://localhost:3000/api/profile');
            // Set the fetched profile data in state
            setProfileData(response.data);
            console.log(profileData.name);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile data:", error);
            setLoading(false);
        }
    };

    // Gets the saved classes
    const fetchClassesData = async () => {
        try {
            // Fetch user saved classes data from the backend
            const response = await axios.get('http://localhost:3000/api/saved');
            // Set the saved classes data in state
            setSavedClasses(response.data);
            setLoadingClasses(false);
        } catch (error) {
            console.error("Error fetching saved classes:", error);
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                {/* <div className={styles.header}>
                    <img src="profile-pic.jpg" alt="Profile Picture" />
                </div> */}
                    <h1>Welcome Zacharius</h1>
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
                            <button onClick={handleClick}>Log Out</button>
                        </ul>
                    </div>
                    <div className={styles.profile_info}>
                        <h2>Profile Information</h2>
                        {loading ? (
                            <p>Loading profile...</p>
                        ) : profileData ? (
                            <div>
                                <p>Name: {profileData.name}</p>
                                <p>Email: {profileData.email}</p>
                                {/* Display other profile information as needed */}
                            </div>
                        ) : (
                            <p>No profile data available</p>
                        )}

                        <h2>Saved Classes</h2>
                        {loadingClasses ? (
                            <p>Loading Saved Classes</p>
                        ) : savedClasses && savedClasses.length > 0 ? (
                            <div className={styles.savedClassList}>
                                {savedClasses.map((classItem, index) => (
                                    <div key={index}>
                                        <p><b>Class Name:</b> {classItem.nickname}</p>
                                        <p><b>Room Number:</b> {classItem.roomnumber}</p>
                                        <p><b>Drexel Building:</b> {classItem.building}</p>
                                        <button onClick={() => handleDelete(classItem._id)}>Delete</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No saved classes</p>
                        )}
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="saveform">Save Class:</label>
                    <input type="text" placeholder="Nickname" value={nicknameInput} onChange={(e) => setNicknameInput(e.target.value)} required />
                    <input type="text" placeholder="Class Number" value={classNumberInput} onChange={(e) => setClassNumberInput(e.target.value)} required />
                    <input id="saveform" name="saveform" value={saveInput} onChange={(e) => handleInputChange(e, setSaveInput, setSaveSuggestions)} required />
                    <div ref={containerRef} className={styles.scrollableContainer} style={{ height: containerHeight }}>
                        {saveSuggestions.map((name, index) => (
                            <button key={index} className={styles.autofill} style={{ cursor: "pointer" }} onClick={() => displayNames(name, setSaveInput, setSaveSuggestions)}>
                                <p>{name}</p>
                            </button>
                        ))}
                    </div>
                    <button className={styles.ProfileButton} type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default UserDash;
