import React from "react";


function InputMain(){

    return(
        <>
           <form id="textForm">
                <label for="destination">Class Location:</label>
                <input id="destination" name="destination" required/>
                <button class="autofill" type="button" onclick="fillinput(this)">Disque Hall 108</button>
                <button class="autofill" type="button" onclick="fillinput(this)">Randell Hall 120</button>
                <button class="autofill" type="button" onclick="fillinput(this)">Lebow Engineering Center 134</button>
                <button class="autofill" type="button" onclick="fillinput(this)">Korman Center 111</button>
                <p id="msg"></p>
                <button class="submit" type="button" onclick="submitinput()">Submit</button>
            </form> 
        </>
    )
};

export default InputMain;