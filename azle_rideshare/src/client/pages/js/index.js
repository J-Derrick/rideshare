// index.js - JavaScript for the initial page (index.html)

document.addEventListener("DOMContentLoaded", function () {
    const driverButton = document.getElementById("driverBtn");
    const riderButton = document.getElementById("riderBtn");

    driverButton.addEventListener("click", function () {
        window.location.href = "driver_registration.html";
    });

    riderButton.addEventListener("click", function () {
        window.location.href = "rider_registration.html";
    });
});
