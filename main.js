

/* This code is adding an event listener to the window object that listens for the "load" event. Once
the page has finished loading, it calls the `initialize()` and `doPageTasks()` functions. The
`initialize()` function initializes Firebase, and the `doPageTasks()` function performs tasks
specific to the current page based on the `pageIdentifier` variable. */
window.addEventListener("load", (event) => {
    initialize();
    doPageTasks();
});

function doPageTasks() {
    
    //segeregate tasks according to the page address
    var pageIdentifier = document.getElementById("pageIdentifier").innerHTML;
    console.log("You are now in " + pageIdentifier)
    switch (pageIdentifier) {
        case "index":
            indexPageTasks();
            break;
        
        case "homePage":
            homePageTasks();
            break;
        case "uploadPhoto":
            uploadPhotoTasks();
            break;
        case "mealsPage":
            mealsPageTasks();
            break;
        case "exercisePage":
            exercisePageTasks();
            break;
        case "medicinePage":
            medicinePageTasks();
            break;
        case "medicineCheckPage":
            medicineCheckPageTasks();
            break;
        
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


function indexPageTasks() {
    console.log("You are now in index page");
    moveProgressBar();

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
    changeHeadingMeal();
}

function exercisePageTasks(){
    console.log("You are now in exercise page");
}

function medicinePageTasks(){
    console.log("You are now in medicine page");
    checkMedicineColor();
}

/**
 * The function performs tasks related to the medicine check page, such as updating a tick box and
 * changing the page heading.
 */
function medicineCheckPageTasks(){
    console.log("You are now in medicine check page");
    document.getElementById("tickBox").innerHTML = getBlankIcon(); 
    checkTickBox();
    changeHeadingMedicine();
}

function changeHeadingMedicine(){
    /* Setting the heading of the page to the current medicine time. */
    console.log(sessionStorage.getItem("currentMedicineTime"));
    document.getElementById("heading").innerHTML = sessionStorage.getItem("currentMedicineTime");
}

function changeHeadingMeal(){
   /* Setting the heading of the page to the current meal. */
    console.log(sessionStorage.getItem("currentMeal"));
    document.getElementById("heading").innerHTML = sessionStorage.getItem("currentMeal");
}


/**
 * The function redirects to the "uploadPhoto.html" page and saves a parameter to local storage.
 * @param a - The parameter "a" is a variable that represents the current meal being uploaded. It is
 * passed as an argument to the function "redirectTouploadPhoto". The function saves the value of "a"
 * to the local storage using the "setItem" method of the "sessionStorage" object. It
 */
function redirectTouploadPhoto(a) {
    console.log("function redirectTouploadPhoto() called with parameter " + a);

    //save a to local storage
    sessionStorage.setItem("currentMeal", a);
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

    if (sessionStorage.getItem("Breakfast")=="true") {
        console.log("Breakfast is taken")
        document.getElementById("breakfastButtonPatient").style.backgroundColor = "#B7FFBA";
    }
    if (sessionStorage.getItem("Lunch")=="true") {
        console.log("Lunch is taken")
        document.getElementById("lunchButtonPatient").style.backgroundColor = "#B7FFBA";
    }
    if (sessionStorage.getItem("Dinner")=="true") {
        console.log("Dinner is taken")
        document.getElementById("dinerButtonPatient").style.backgroundColor = "#B7FFBA";
    }

}

function checkTickBox() {

    if (sessionStorage.getItem(sessionStorage.getItem("currentMedicineTime"))) {

        console.log("medicine is taken")
        document.getElementById("tickBox").innerHTML = getTickIcon();
    }
}


function checkMedicineColor() {

    if (sessionStorage.getItem("Morning")=="true") {
        console.log("Morning is taken")
        document.getElementById("morningButtonPatient").style.backgroundColor = "#B7FFBA";
    }
    if (sessionStorage.getItem("Afternoon")=="true") {
        console.log("Afternoon is taken")
        document.getElementById("afternoonButtonPatient").style.backgroundColor = "#B7FFBA";
    }
    if (sessionStorage.getItem("Night")=="true") {
        console.log("Night is taken")
        document.getElementById("nightButtonPatient").style.backgroundColor = "#B7FFBA";
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

        const filename = sessionStorage.getItem("currentMeal") + ".jpeg"

        // Create a reference to the storage location in Firebase Storage.
        const storageRef = firebase.storage().ref().child('photos/' + filename);

        // Upload the file to Firebase Storage.
        storageRef.put(file).then((snapshot) => {
            console.log('Uploaded file', snapshot);
            //update firebase to set current meal true
            mealTaken(sessionStorage.getItem("currentMeal"));
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
/**
 * The function updates the database and local storage to mark the completion of an exercise.
 */
function exerciseDone(){
   //update database and local storage

    //set the in database value to true 
    //future scope for every user do  ('users/' + userId)
    var database = firebase.database();
    database.ref("Exercise").set(true);

    //set local storage value to true
    sessionStorage.setItem(exercise, true);
}

function mealTaken(meal) {
    //update database and local storage

    //set the in database value to true 
    //future scope for every user do  ('users/' + userId)
    var database = firebase.database();
    database.ref("Meal/" + meal).set(true);

    //set local storage value to true
    sessionStorage.setItem(meal, true);
}

function redirectToMedicineCheck(medicine){
    console.log("redirecting to medicine check")
    sessionStorage.setItem("currentMedicineTime", medicine); //can be Morning Afternoon Night
    window.location.href = "medicineCheckPage.html"
}

function allPillsTaken(){
    var database = firebase.database();
    var currentMedicine = sessionStorage.getItem("currentMedicineTime");
    database.ref("Medicine/" +currentMedicine).set(true).then(() =>{

    //set local storage value to true
    sessionStorage.setItem(currentMedicine, true);

    document.getElementById("tickBox").innerHTML = getTickIcon();
    
    
    //wait to show chckbox turning green
    setTimeout(function () {
        //needs feedback for button press but not for now
    redirectToHomePage();
    }, 1000);

});
    

}

function getTickIcon(){
    //returns tick icon
    return "✅";
}

function getCrossIcon(){
    //returns cross icon
    return "❌";
}

function getBlankIcon(){
    //returns blank icon
    return "⬜️";
}

function moveProgressBar(){
    //move progress bar for 5 seconds i.e. change width from 0 to 100 gradually in 5 seconds the redirect to home page


    var progressBar = document.getElementById('scrollbar');
    var width = 0;
    var increment = 100 / 100; // Increment by 1% each time (100% / 100 steps)
    var interval = setInterval(function() {
      if (width >= 100) { //100 as in 100% width
        clearInterval(interval); // Stop the interval when width reaches 100
        redirectToHomePage(); // Redirect to home page
      
      } else {
        width += increment;
        progressBar.style.width = width + '%';
      }
    },50); // Run the interval every 50 milliseconds (0.05 seconds)
  
}