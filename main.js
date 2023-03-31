

window.addEventListener("load", (event) => {
    initialize();
    doPageTasks();
});

function doPageTasks() {
    console.log("You are now in " + window.location.pathname)
    //segeregate tasks according to the page address
    switch (window.location.pathname) {
        case "/homePage.html":
            homePageTasks();
        case "/uploadPhoto.html":
            uploadPhotoTasks();
        case "/mealsPage.html":
            mealsPageTasks();
    }
}


function initialize() {
    console.log("Hello world");
    initializeFirebase();

}

function initializeFirebase() {
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


function homePageTasks() {
    console.log("You are now in home page");
}

function mealsPageTasks() {
    console.log("You are now in meals page");
    checkMealsColor();
}

function uploadPhotoTasks() {
    console.log("You are now in upload photo page");

}

function redirectTouploadPhoto(a) {
    console.log("function redirectTouploadPhoto() called with parameter " + a);

    //save a to local storage
    localStorage.setItem("currentMeal", a);
    window.location.href = "uploadPhoto.html";
}
function redirectToMedicinePage() {
    window.location.href = "medicinePage.html";
}

function redirectToMealsPage() {
    window.location.href = "mealsPage.html";
}

function redirectToExercisePage() {
    window.location.href = "exercisePage.html";
}

function redirectToHomePage(){
    window.location.href = "homePage.html";
}



function checkMealsColor() {

    if (localStorage.getItem("Breakfast")) {
        console.log("Breakfast is taken")
        document.getElementById("breakfastButtonPatient").style.backgroundColor = "#B7FFBA";
    }
    if (localStorage.getItem("Lunch")) {
        console.log("Lunch is taken")
        document.getElementById("lunchButtonPatient").style.backgroundColor = "#B7FFBA";
    }
    if (localStorage.getItem("Dinner")) {
        console.log("Dinner is taken")
        document.getElementById("dinerButtonPatient").style.backgroundColor = "#B7FFBA";
    }
}

function uploadPhoto(a) {
    //choose photo from input and upload to firebase storage then update firebase database and redirect to meals page

    // Create a file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.capture = "environment";

    // Listen for file input changes
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        // Do something with the selected file
        console.log("Selected file:", file);
        console.log(fileInput.value)

        // Create a unique filename for the uploaded image fetch from local storage

        const filename = localStorage.getItem("currentMeal") + ".jpeg"

        // Create a reference to the storage location in Firebase Storage.
        const storageRef = firebase.storage().ref().child('photos/' + filename);

        // Upload the file to Firebase Storage.
        storageRef.put(file).then((snapshot) => {
            console.log('Uploaded file', snapshot);
            //update firebase to set current meal true
            mealTaken(localStorage.getItem("currentMeal"));
            redirectToHomePage();
        });

    });

    // Trigger a click event on the file input element
    fileInput.click();

}

function uploadVideo(a) {
    //choose photo from input and upload to firebase storage then update firebase database and redirect to meals page

    // Create a file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "video/*";
    fileInput.capture = "environment";

    // Listen for file input changes
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        // Do something with the selected file
        console.log("Selected file:", file);
        console.log(fileInput.value)

        // Create a unique filename for the uploaded image fetch from local storage

        const filename = "Exercise"+ ".mp4"

        // Create a reference to the storage location in Firebase Storage.
        const storageRef = firebase.storage().ref().child('videos/' + filename);

        // Upload the file to Firebase Storage.
        storageRef.put(file).then((snapshot) => {
            console.log('Uploaded file', snapshot);
            //update firebase to set current meal true
            exerciseDone()
            redirectToHomePage();
        });

    });

    // Trigger a click event on the file input element
    fileInput.click();

}
function exerciseDone(){
    // do something
}

function mealTaken(meal) {
    //update database and local storage

    //set the in database value to true 
    //future scope for every user do  ('users/' + userId)
    var database = firebase.database();
    firebase.database().ref("Meal/" + meal).set(true);

    //set local storage value to true
    localStorage.setItem(meal, true);
}