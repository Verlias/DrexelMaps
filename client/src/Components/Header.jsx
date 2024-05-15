import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import styles from "./Header.module.css";

function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Sets isLoggedIn to true if token exists, false otherwise
    }, []);

    return(
        <>
            <header className={styles.HeaderNav}>
                <nav>
                    <ul>
                        <li className={styles.NavLink}><Link to="/Map" style={{textDecoration : 'none'}}><span className={styles.NavText}>Map</span></Link></li>
                        <li className={styles.NavLink}><Link to="/Input" style={{textDecoration : 'none'}}><span className={styles.NavText}>Input</span></Link></li>
                        <li className={styles.NavLink}><Link to="/Layout" style={{textDecoration : 'none'}}><span className={styles.NavText}>Layout</span></Link></li>
                        {!isLoggedIn && (
                            <>
                                <li className={styles.NavLink}><Link to="/Login" style={{ textDecoration: 'none' }}><span className={styles.NavText}>Login</span></Link></li>
                            </>
                        )}
                        {isLoggedIn && (
                            <li className={styles.NavLink}>
                                <Link to="/Profile" style={{textDecoration: 'none'}}>
                                    <span className={styles.NavText}>Profile</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                    <p class={styles.DrexelTitle}>Drexel University</p>
                </nav>
            </header>
           
        </>
    )
}

export default Header;