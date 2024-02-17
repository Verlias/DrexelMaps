import React from "react";
import styles from "./Input-Page.module.css";


function InputMain(){

    return(
        <>
           <form className={styles.form}>
                <label className={styles.label} for="destination">Class Location:</label>
                <input className={styles.input} id="destination" name="destination" required/>
                <button className={styles.autofill} type="button" onclick="fillinput(this)">Disque Hall 108</button>
                <button className={styles.autofill} type="button" onclick="fillinput(this)">Randell Hall 120</button>
                <button className={styles.autofill} type="button" onclick="fillinput(this)">Lebow Engineering Center 134</button>
                <button className={styles.autofill} type="button" onclick="fillinput(this)">Korman Center 111</button>
                <p id="msg"></p>
                <button className={styles.submit} type="button" onclick="submitinput()">Submit</button>
            </form> 
        </>
    )
};

export default InputMain;