// Координати коледжу
const ourCoords = {
    latitude: 48.94294,
    longitude: 24.73358
};

let watchId = null;
let map = null;
let marker = null;
let destinationMarker = null;
let historyMarkers = [];

document.addEventListener('DOMContentLoaded', getMyLocation);

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });

        let watchButton = document.getElementById("watch");
        if (watchButton) watchButton.onclick = watchLocation;

        let clearWatchButton = document.getElementById("clearWatch");
        if (clearWatchButton) clearWatchButton.onclick = clearWatch;

        let scrollButton = document.getElementById("scrollToDest");
        if (scrollButton) scrollButton.onclick = scrollToDestination;
    } else {
        alert("Oops, no geolocation support");
    }
}

// Ініціалізація карти Leaflet із класичним шаром OpenStreetMap
function initMap(lat, lng) {
    if (!map) {
        map = L.map('map').setView([lat, lng], 15);
        
        //відкритий сервер OSM France, який не блокує локальні запити 
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
}

// отримання позиції
function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let accuracy = position.coords.accuracy;
    let timestamp = new Date(position.timestamp).toLocaleTimeString();

    let div = document.getElementById("location");
    if (div) {
        div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude} ( з точністю ${accuracy} метрів )`;
    }

    let km = computeDistance(position.coords, ourCoords);
    let distanceDiv = document.getElementById("distance");
    if (distanceDiv) {
        distanceDiv.innerHTML = `You are ${km.toFixed(3)} km from the College`;
    }

   
    if (!map) {
        initMap(latitude, longitude);
    } else {
        map.setView([latitude, longitude], 16);
    }

    // додаємо/оновлюємо маркер
    if (marker) {
        marker.setLatLng([latitude, longitude]);
        marker.bindPopup(`<b>You are here:</b> ${latitude.toFixed(5)}, ${longitude.toFixed(5)}<br>Час: ${timestamp}`).openPopup();
    } else {
        marker = L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`<b>You are here:</b> ${latitude.toFixed(5)}, ${longitude.toFixed(5)}<br>Час: ${timestamp}`)
            .openPopup();
    }

    // додаємо маркер в історію рухів
    let historyMarker = L.circleMarker([latitude, longitude], {
        radius: 6,
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.7
    }).addTo(map);
    historyMarker.bindPopup(`Координати: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}<br>Час: ${timestamp}`);
    historyMarkers.push(historyMarker);
}

// обробка помилок геолокації
function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    let errorMessage = errorTypes[error.code] || "Unknown error";
    let div = document.getElementById("location");
    if (div) {
        div.innerHTML = "ErrorMessage: " + errorMessage;
    }
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371;

    let distance = Math.acos(
        Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)
    ) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

//відстеження у реальному часі
function watchLocation() {
    if (!watchId) {
        watchId = navigator.geolocation.watchPosition(displayLocation, displayError, {
            enableHighAccuracy: true,
            maximumAge: 3000,
            timeout: 27000
        });
        alert("Відстеження у реальному часі увімкнено.");
    }
}

// зупинка відстеження
function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        alert("Відстеження зупинено.");
    }
}

// скрол до пункту призначення
function scrollToDestination() {
    let latInput = parseFloat(document.getElementById("destLat").value);
    let lngInput = parseFloat(document.getElementById("destLng").value);

    if (isNaN(latInput) || isNaN(lngInput)) {
        alert("Будь ласка, введіть коректні числові значення широти та довготи!");
        return;
    }

    if (map) {
        map.setView([latInput, lngInput], 16, {
            animate: true,
            duration: 1.0
        });

        if (destinationMarker) {
            destinationMarker.setLatLng([latInput, lngInput]);
            destinationMarker.bindPopup(`<b>Пункт призначення</b><br>${latInput}, ${lngInput}`).openPopup();
        } else {
            destinationMarker = L.marker([latInput, lngInput]).addTo(map)
                .bindPopup(`<b>Пункт призначення</b><br>${latInput}, ${lngInput}`)
                .openPopup();
        }
    }
}
