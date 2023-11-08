// rider_registration.js - JavaScript for the rider registration page (rider_registration.html)

document.addEventListener("DOMContentLoaded", function () {
    const autoPickupBtn = document.getElementById("autoPickupBtn");
    const registerBtn = document.getElementById("registerBtn");

    autoPickupBtn.addEventListener("click", function () {
        alert("Using your current location as pick-up point.");
    });

    registerBtn.addEventListener("click", function () {
        const destination = document.getElementById("destination").value;
        const vehicleType = document.getElementById("vehicleType").value;
        alert("Registration successful! Destination: " + destination + ", Vehicle: " + vehicleType);
    });
});
