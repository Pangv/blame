// Initialize Firebase
var config = {
  apiKey: "AIzaSyDJvSHmBNUBrgUGfTSO8WHFBDl7Kt9Bqd4",
  authDomain: "blame-7dbc4.firebaseapp.com",
  databaseURL: "https://blame-7dbc4.firebaseio.com",
  projectId: "blame-7dbc4",
  storageBucket: "blame-7dbc4.appspot.com",
  messagingSenderId: "509493189423"
};
firebase.initializeApp(config);

const dbRefObject = firebase.database().ref().child('sins');


// push key
var newSinKey = firebase.database().ref().child('sins').push().key;


function writeSins(title) {
  var sinData = {
    title: title,
    count: 0
  };
}
