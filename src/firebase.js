// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

initializeApp(firebaseConfig);
const messaging = getMessaging()
// const messaging = firebase.messaging();

const public_key = ""

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: public_key })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                // Perform any other neccessary action with the token
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload)
            resolve(payload);
        });
    });