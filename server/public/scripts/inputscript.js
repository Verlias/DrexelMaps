let startingLocationInput = document.getElementById("startdestination");
let endingLocationInput = document.getElementById("enddestination");

// Fetch the names of each building in building_locations.json file
// and store it in the buildingNames list
let buildingNames = []; 
async function fetchNames() {
    try {
        const response = await fetch("other/building_locations.json");
        if (!response.ok) {
            throw new Error("Could not fetch resource.");
        }
        const values = await response.json();
        buildingNames = values.map((value) => value.name);

        return buildingNames;
    } catch (error) {
        console.error(error);
        return []; // or handle the error as needed
    }
}

fetchNames().then(() => {
    buildingNames = buildingNames.filter((value) => value != 'road').sort();

    startingLocationInput.addEventListener("keyup", (e) => {
        removeNames();
        for (let buildingName of buildingNames){
            if (buildingName.toLowerCase().startsWith(startingLocationInput.value.toLowerCase()) && 
                startingLocationInput.value != ""){
                let listItem = document.createElement("li");
                listItem.classList.add("list-names1");
                listItem.style.cursor = "pointer";
                listItem.setAttribute("onclick", "displayNamesStarting('" + buildingName + "')");
                let word = "<b>" + buildingName.substr(0, startingLocationInput.value.length) + "</b>";
                word += buildingName.substr(startingLocationInput.value.length);
                listItem.innerHTML = word;
                document.querySelector(".list1").appendChild(listItem);
            }
        }
    });

    endingLocationInput.addEventListener("keyup", (e) => {
        removeNames();
        for (let buildingName of buildingNames){
            if (buildingName.toLowerCase().startsWith(endingLocationInput.value.toLowerCase()) && 
                endingLocationInput.value != ""){
                let listItem = document.createElement("li");
                listItem.classList.add("list-names2");
                listItem.style.cursor = "pointer";
                listItem.setAttribute("onclick", "displayNamesEnding('" + buildingName + "')");
                let word = "<b>" + buildingName.substr(0, startingLocationInput.value.length) + "</b>";
                word += buildingName.substr(startingLocationInput.value.length);
                listItem.innerHTML = word;
                document.querySelector(".list2").appendChild(listItem);
            }
        }
    });
});

function displayNamesStarting(value){
    startingLocationInput.value = value;
    removeNames(); 
}

function displayNamesEnding(value){
    endingLocationInput.value = value;
    removeNames(); 
}

function removeNames(){
    let names1 = document.querySelectorAll(".list-names1");
    let names2 = document.querySelectorAll(".list-names2");
    names1.forEach((name) => {
        name.remove()
    });
    names2.forEach((name) => {
        name.remove()
    });
}

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