import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDaQp0L39zstLN9kWfwxHwivI3BewWczXg",
    authDomain: "atmanirbhar-bharat-escrow.firebaseapp.com",
    projectId: "atmanirbhar-bharat-escrow",
    storageBucket: "atmanirbhar-bharat-escrow.appspot.com",
    messagingSenderId: "1012419692994",
    appId: "1:1012419692994:web:c7d5a81ec91bdf5a756e5b",
    measurementId: "G-1GLG37J9PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebase