import React from "react";
import {Link} from "react-router-dom";
import styles from "./Header.module.css";

function Header(){

    return(
        <>
            <header className={styles.HeaderNav}>
                <nav className={styles.NavBar}>
                    <ul className={styles.NavList}>
                        <li className={styles.NavLink}><Link to="/Home" style={{textDecoration : 'none'}}><span className={styles.NavText}>Home</span></Link></li>
                        <li className={styles.NavLink}><Link to="/Map" style={{textDecoration : 'none'}}><span className={styles.NavText}>Map</span></Link></li>
                        <li className={styles.NavLink}><Link to="/Input" style={{textDecoration : 'none'}}><span className={styles.NavText}>Input</span></Link></li>
                        <li className={styles.NavLink}><Link to="/Layout" style={{textDecoration : 'none'}}><span className={styles.NavText}>Layout</span></Link></li>
                        <li className={styles.NavLink}><Link to="/SignUp" style={{textDecoration : 'none'}}><span className={styles.NavText}>SignUp</span></Link></li>
                    </ul>
                </nav>
                <p class={styles.DrexelTitle}>Drexel University</p>
            </header>
           
        </>
    )
}

export default Header;