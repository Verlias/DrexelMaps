import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import Header from "../Components/Header";
import buildingData from "./building_locations.json";
import ProfileInputModal from "./ProfileInputModal";

function UserDash() {
    const containerRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState('auto');
    const [isOpen, setIsOpen] = useState(false);
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
        } else {
            setContainerHeight("0px");
        }
    }, [saveSuggestions]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
        }
    }, [navigate]);

    const handleClick = async (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/Login');
    };

    useEffect(() => {
        const names = buildingData.map(building => building.name).filter(name => name !== 'road').sort();
        setSaveSuggestions(names);

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
            await axios.post('http://localhost:3000/api/save/', {
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
            await axios.post('http://localhost:3000/api/deleteclass/', {
                itemId: id
            });
            window.location.reload();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/profile');
            setProfileData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile data:", error);
            setLoading(false);
        }
    };

    const fetchClassesData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/saved');
            setSavedClasses(response.data);
            setLoadingClasses(false);
        } catch (error) {
            console.error("Error fetching saved classes:", error);
            setLoadingClasses(false);
        }
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.sidebar}>
                        <h2 className={styles.sidebar_h2}>Dashboard</h2>
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
                            <button className={styles.LogoutButton} onClick={handleClick}>Log Out</button>
                        </ul>
                        {loading ? (
                            <p>Loading profile...</p>
                        ) : profileData ? (
                            <div>
                                <p className={styles.ProfileName}>Welcome {profileData.name}!</p>
                                <div className={styles.UserInformationContainer}>
                                    <h2 className={styles.UserInfoHeader}>User Information:</h2>
                                    <p className={styles.UserInfo}>Name: {profileData.name}</p>
                                    <p className={styles.UserInfo}>Email: {profileData.email}</p>
                                    <div className={styles.addClassButtonContainer}>
                                        <button className={styles.addClassButton} onClick={() => setIsOpen(true)}>Add Class</button>
                                        <div className={styles.RouteMapButton}><Link to="/Map">Map</Link></div>
                                        <ProfileInputModal open={isOpen} onClose={() => setIsOpen(false)}>
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
                                        </ProfileInputModal>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No profile data available</p>
                        )}
                    </div>
                    <div className={styles.profile_info}>
                        <h2 className={styles.HeadlineLoading}>Saved Classes:</h2>
                        {loadingClasses ? (
                            <p className={styles.HeadlineLoading}>Loading Saved Classes...</p>
                        ) : savedClasses && savedClasses.length > 0 ? (
                            <div className={styles.savedClassList}>
                                {savedClasses.map((classItem, index) => (
                                    <div key={index}>
                                        <p><b>Class Name:</b> {classItem.nickname}</p>
                                        <p><b>Room Number:</b> {classItem.roomnumber}</p>
                                        <p><b>Drexel Building:</b> {classItem.building}</p>
                                        <i onClick={() => handleDelete(classItem._id)} className='fas fa-trash' style={{ fontSize: '28px', color: 'red', cursor: 'pointer' }}></i>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.NoSavedClasses}>No saved classes</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDash;
