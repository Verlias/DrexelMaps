// Check if geolocation is available
if ("geolocation" in navigator) {
    // Request current position
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
    console.log("Geolocation is not supported by this browser.");
}

// Success callback function
function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log("latitude: " + latitude);
    console.log("longitude: " + longitude);
}

// Error callback function
function errorCallback(error) {
    console.error("Error getting user's location:", error);
}
