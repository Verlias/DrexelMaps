import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Input-Page.module.css";


function InputMain(){
    const navigate = useNavigate();

    function fillinput(event) {
        var inputbox = document.getElementById('destination');
        var autofillValue = event.target.innerText;
        inputbox.value = autofillValue;
    }

    function submitinput() {
        // Get the input text
        var inputText = document.getElementById('destination').value;

        const valid = Boolean(validateinput(inputText));

        if (valid) {
            navigate('/Map');
            console.log("User sent to new Page!")
        }
    }

    function validateinput(input) {
        // Validation will check if the class is in the database
        if (["Disque Hall 108", "Randell Hall 120", "Lebow Engineering Center 134", "Korman Center 111"].includes(input)) {
            document.getElementById("msg").innerHTML = "Input Recieved!"
            return true
        }
        else {
            document.getElementById("msg").innerHTML = "Please Input a Valid Location"
            return false
        }
    }

    return(
        <>
           <form className={styles.form} id="textForm" >
                <label className={styles.label} htmlFor="destination">Class Location:</label>
                <input className={styles.input} id="destination" name="destination" required />
                <button className={styles.autofill} type="button" onClick={fillinput}>Disque Hall 108</button>
                <button className={styles.autofill} type="button" onClick={fillinput}>Randell Hall 120</button>
                <button className={styles.autofill} type="button" onClick={fillinput}>Lebow Engineering Center 134</button>
                <button className={styles.autofill} type="button" onClick={fillinput}>Korman Center 111</button>
                <p id="msg"></p>
                <button className={styles.submit} type="button" onClick={submitinput}>Submit</button>
            </form>
        </>
    )
};

export default InputMain;

