import React from "react";
import {Link} from "react-router-dom";
import styles from "./Profile.module.css";
import Header from "../Components/Header";

function UserDash(){

    return(
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
            </div>
        </>
    )
}

export default UserDash;