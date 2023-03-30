

window.addEventListener("load", (event) => {
    initialize();
});

function initialize(){
    console.log("Hello world");
    initializeFirebase();

}
function initializeFirebase(){
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKkCsFGiyrknZV9GmltiEuiw8J42yx7lI",
    authDomain: "dynabyte-8bdc2.firebaseapp.com",
    databaseURL: "https://dynabyte-8bdc2-default-rtdb.firebaseio.com",
    projectId: "dynabyte-8bdc2",
    storageBucket: "dynabyte-8bdc2.appspot.com",
    messagingSenderId: "844964808260",
    appId: "1:844964808260:web:3f5c90b6d486e5873f9e11",
    measurementId: "G-CDV2KEQC9V"
  };
  const app = firebase.initializeApp(firebaseConfig);
  console.log(app);
}

function redirectToUploadPhotoPage(a){
    console.log("function redirectToUploadPhotoPage() called with parameter "+a);

}