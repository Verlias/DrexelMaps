// Define functions for Input Form
function fillinput1(button) {
    var inputbox = document.getElementById('startdestination');
    var autofillValue = button.innerText;
    inputbox.value = autofillValue;
}

function fillinput2(button) {
    var inputbox = document.getElementById('enddestination');
    var autofillValue = button.innerText;
    inputbox.value = autofillValue;
}
function validateinput(input) {
    // Validation will check if the class is in the database
    if (["Disque Hall", "Randell Hall", "Lebow Engineering Center", "Korman Center",].includes(input)) {
        document.getElementById("msg").innerHTML = "Input Recieved!"
        return true
    }
    else {
        document.getElementById("msg").innerHTML = "Please Input a Valid Location"
        return false
    }
}