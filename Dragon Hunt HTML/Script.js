// main.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
// Make sure to also import getDatabase, ref, set, onValue, and get for Realtime Database functions
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmrxwZ4F7E3Xfa_gi0tfiS7JH3NqxgjXY",
  authDomain: "dragon-hunt-html.firebaseapp.com",
  databaseURL: "https://dragon-hunt-html-default-rtdb.firebaseio.com",
  projectId: "dragon-hunt-html",
  storageBucket: "dragon-hunt-html.firebasestorage.app",
  messagingSenderId: "724852876791",
  appId: "1:724852876791:web:ce453714f44472bad27af2",
  measurementId: "G-9ESB16Y3M0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const analytics = getAnalytics(app); // Optional: If you want to use Google Analytics
const database = getDatabase(app);   // Realtime Database service


// --- Firebase application logic ---

// Get a reference to the specific path for Karl's health
const karlHealthRef = ref(database, 'players/Karl/health');

// Function to set Karl's health in the Realtime Database
function setKarlHealth(healthValue) {
    set(karlHealthRef, healthValue)
        .then(() => {
            console.log(`Karl's health set to ${healthValue} successfully!`);
            // The onValue listener below will automatically update the display
        })
        .catch((error) => {
            console.error("Error setting Karl's health:", error);
        });
}


// --- Your displayisleinfo function ---

// Global variable for tracking the previously selected island
let pastselectedisland = 0;

function displayisleinfo(selected) {
    let isledecriptionboxjs = document.getElementById("isledescriptionbox"); // Ensure you have an element with this ID in your HTML

    if (!isledecriptionboxjs) {
        console.error("Element with ID 'isledescriptionbox' not found.");
        return; // Exit if the element doesn't exist
    }

    if (pastselectedisland === selected) {
        if (confirm("Do you want to travel to the selected island?")) {
            // IMPORTANT: This local file path will NOT work once deployed to Firebase Hosting.
            // You'll need to change this to a relative path or a Firebase Hosting URL.
            // For example: window.location.href = "/Island 1/index.html"; or just "/Island 1/";
            window.location.href = "C:/ShellyPrograms/Dragon Hunt HTML/Island 1/index.html";
        }
    } else {
        if (selected === 1) {
            isledecriptionboxjs.innerHTML = "A relatively unknown island. Most dragons stay away from it as the fog makes it hard to see. Here, the snowstorms are so bad you can't see 15 feet in front of you. You can only stay here for 2 turns without some kind of protection.";
        } else if (selected === 2) {
            isledecriptionboxjs.innerHTML = "The Northernmost island. Believe to be home of several dragons, this island holds many relics, but also the danger of dragons finding you on their home turf.  This island is where many lesser dragons flee to avoid the power of the apex dragons which have carved out empires for themselves.";
        } else if (selected === 3) {
           isledecriptionboxjs.innerHTML = "Terrain is very rocky and has lots of caves and hiding spots but has extremely high dragon encounters for those unlucky enough to not find a cave.";
        } else if (selected === 4) {
            isledecriptionboxjs.innerHTML = "An island about the size of a small neighborhood. All dragons go here all the time, but there is a cave with enough room for one person so they can hide.";
        } else if (selected === 5) {
            isledecriptionboxjs.innerHTML = "This is the place of many battles. The most legendary of which is said to have created a great wizard who blasted his whole family in his search for power. The island's terrain isn't particularly dangerous, although most of the known dragons are known to visit it from time to time.";
        } else if (selected === 6) {
            isledecriptionboxjs.innerHTML = "There is lots of treasure here and relics and no apparent danger. Dragons rarely visit it.";
        } else if (selected === 7) {
            isledecriptionboxjs.innerHTML = "This island is completely uninhabitable and you can't go here without some form of special power.";
        } else if (selected === 8) {
            isledecriptionboxjs.innerHTML = "A desolate wasteland ravaged by battles gone. This island is only habitable for one turn before it takes a toll on you. I have no idea why you would go here.";
        } else if (selected === 9) {
            isledecriptionboxjs.innerHTML = "Very muddy and murky. The island itself is considered to have dangerous wildlife and although they're rare, does have dragons attacks.";
        }
        pastselectedisland = selected;
    }
}

// Make displayisleinfo globally accessible if you're calling it from inline HTML event handlers
// If you're calling it from other module scripts, you'd export it instead.
window.displayisleinfo = displayisleinfo;


// --- Event listeners and real-time data display ---

// Attach event listener to the DOM once it's loaded
document.addEventListener('DOMContentLoaded', async () => { // Make this an async function!

    // --- NEW: Simplified code to set Karl's X position and alert its value ---
    const karllocalx = 20;
    const KarlXposRef = ref(database, 'players/Karl/X');

    try {
        // 1. Set the value in the database
        await set(KarlXposRef, karllocalx);
        console.log("Karl's X position (players/Karl/X) set to 20 in DB.");

        // 2. Get the value back from the database
        const snapshot = await get(KarlXposRef);

        // 3. Alert the value if it exists
        if (snapshot.exists()) {
            const KarlcloudX = snapshot.val();
            alert("Karl's X position from Cloud: " + KarlcloudX); // This will alert "Karl's X position from Cloud: 20"
        } else {
            alert("Error: Karl's X position not found after setting it.");
        }
    } catch (error) {
        console.error("An error occurred with Karl's X position operations:", error);
        alert("An error occurred: " + error.message);
    }
    // --- END NEW SIMPLIFIED CODE ---


    // 1. Button to set Karl's health to a fixed 100
    const setHealthButton = document.getElementById('set-health-button');
    if (setHealthButton) {
        setHealthButton.addEventListener('click', () => {
            setKarlHealth(100); // Calls the function to set Karl's health to 100 in the DB
        });
    }

    // 2. Elements for updating Karl's health from an input field
    const updateHealthButton = document.getElementById('update-health-button');
    const newKarlHealthInput = document.getElementById('newKarlHealth');

    if (updateHealthButton && newKarlHealthInput) {
        updateHealthButton.addEventListener('click', () => {
            const newHealthValue = parseInt(newKarlHealthInput.value, 10); // Get value as an integer
            if (!isNaN(newHealthValue) && newKarlHealthInput.value.trim() !== '') { // Check if it's a valid number and not just empty
                setKarlHealth(newHealthValue); // Calls the function to set Karl's health in the DB
                newKarlHealthInput.value = ''; // Optionally clear the input field after setting
            } else {
                alert("Please enter a valid number for Karl's health.");
            }
        });
    }

    // 3. Real-time listener for Karl's health display
    const karlHealthDisplay = document.getElementById('karl-health-display');
    if (karlHealthDisplay) {
        onValue(karlHealthRef, (snapshot) => {
            const currentHealth = snapshot.val();
            if (currentHealth !== null) {
                karlHealthDisplay.innerText = `Karl's Health: ${currentHealth}`;
            } else {
                karlHealthDisplay.innerText = `Karl's Health: Not set yet`;
            }
        });
    }
});
