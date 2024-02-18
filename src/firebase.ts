// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {createUser, initAuth, signIn} from "./fbAuth.ts";
import {createKeyword, getTop5Keywords, increaseKeywordCount, initDatabase, listenForChanges, resetAllKeywordCounts} from "./fbDatabase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqLOLj47xEMFrmTt6eC-I1yym49hL9y6g",
    authDomain: "blame-691cd.firebaseapp.com",
    databaseURL: "https://blame-691cd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blame-691cd",
    storageBucket: "blame-691cd.appspot.com",
    messagingSenderId: "32580063670",
    appId: "1:32580063670:web:9d6059c8c280f233c5b117"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initAuth(app);
initDatabase(app);

// export the createKeyword function and app
export {app, createUser, signIn, createKeyword, listenForChanges, increaseKeywordCount, resetAllKeywordCounts, getTop5Keywords};