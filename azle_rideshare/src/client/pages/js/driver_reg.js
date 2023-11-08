// driver_registration.js - JavaScript for the driver registration page (driver_registration.html)

document.addEventListener("DOMContentLoaded", function () {
    const availabilityToggle = document.getElementById("availabilityToggle");

    availabilityToggle.addEventListener("change", function () {
        if (availabilityToggle.checked) {
            alert("You are now available as a driver for trips.");
        } else {
            alert("You are no longer available as a driver. You will not be considered for trips");
        }
    });
});
