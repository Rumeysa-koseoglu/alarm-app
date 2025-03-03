//initial references
let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
//an array to store alarms
let alarmsArray = [];
let alarmSound = new Audio("alarm.mp3");

// Starting values for hours, minutes, and alarm numbers
let initialHour = 0,
    initialMinute = 0,
    alarmIndex = 0;

// Append zero to single-digit numbers
const appendZero = (value) => (value < 10 ? "0" + value : value);

// Search for a value in an object
const searchObject = (parameter, value) => {
    let alarmObject, // Variable to store the object(alarm) we found
        objIndex,    // Variable to store the index of the found object in the array
        exists = false; // Initially false (because we haven't found anything yet)

    // Check each element in the array one by one
    alarmsArray.forEach((alarm, index) => {
        if (alarm[parameter] == value) { // If the object's property (parameter) is equal to the value we want
            exists = true;     // Yes, such an object exists
            alarmObject = alarm; // Store found object
            objIndex = index;  // Save the object's position in the list
            return false;      // Stop the loop
        }
    });

    // Return the found information as an array (true/false, object, index number)
    return [exists, alarmObject, objIndex];
};

//Display Time
function displayTimer() {
    //create a new Date object that gives the current date and time
    let date = new Date();
    //get hours, minutes, and seconds from the date object
    let [hours, minutes, seconds] = [
        appendZero(date.getHours()),//get current hour and add "0" if needed
        appendZero(date.getMinutes()),//get current minute and add "0" if needed
        appendZero(date.getSeconds()),//get current second and add "0" if needed
    ];

    timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

    //alarm
    alarmsArray.forEach((alarm, index) => {
        if (alarm.isActive) { //check if the alarm is turned on
            if (`${alarm.alarmHour}:${alarm.alarmMinute}`// compare current time with alarm time
                === `${hours}:${minutes}`) {
                alarmSound.play();//play the alarm sond
                alarmSound.loop = true; //keep the alarm sound looping


                setTimeout(() => {
                    alarmSound.pause();
                    alarmSound.currentTime = 0;
                }, 10000);
            }
        }
    });
}

//check and format the input values
// const InputCheck = (inputValue) => {
//     inputValue = parseInt(inputValue);//convert input value to a number
//     if (inputValue < 10) { //if the numbet is less than 10
//         inputValue = appendZero(inputValue);//add a leading zero
//     }
//     return inputValue;// return the formatted value
// };

//add event listener to hour inpt field
hourInput.addEventListener("input", () => {
    // hourInput.value = InputCheck(hourInput.value); //format the input value
});

minuteInput.addEventListener("input", () => {
    // minuteInput.value = InputCheck(minuteInput.value);
});

//create alarm div
//create an alarm element in the UI
const createAlarm = (alarmObj) => {
    //keys from object
    const { id, alarmHour, alarmMinute } = alarmObj;
    //create a new div element for the alarm
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute("data-id", id); //set a unique ID for the alarm
    //display alarm time
    alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}</span>`;

    //create a checkbox to enable/disable the alarm
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");//set type as checkbox
    checkbox.addEventListener("click", (e) => {
        if (e.target.checked) {
            startAlarm(e);//start the alarm when checked
        }
        else {
            stopAlarm(e);//stop the alarm when unchecked
        }
    });
    alarmDiv.appendChild(checkbox); //add checkbox to the alarm div
    //create a delete button for the alarm
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add("deleteButton");//add class for styling
    //add event listener for delete function
    deleteButton.addEventListener("click", (e) => deleteAlarm(e));
    alarmDiv.appendChild(deleteButton);
    //append the alarm div to the active alarms list
    activeAlarms.appendChild(alarmDiv);
};

//event listener for setting an alarm when the button is clicked
setAlarm.addEventListener("click", () => {
    alarmIndex += 1;//increment alarm index

    //create an alarmObject
    let alarmObj = {};
    alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;//unique ID for each alarm
    alarmObj.alarmHour = appendZero(hourInput.value);//store hour input
    alarmObj.alarmMinute = appendZero(minuteInput.value);// " minute input
    alarmObj.isActive = false;//set alarm as inactive initially
    console.log(alarmObj);//log the created alarm for debugging
    alarmsArray.push(alarmObj);//add the new alarm to the array
    createAlarm(alarmObj);//call function to create alarm in UI
    //reset input fields to default values
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
});

//start alarm
//turn on the alarm when checkbox checked
const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    //call the searchObject function to find if an alarm with "data-id" exist in alarmsArray
    let [exists, obj, index] = searchObject("id", searchId);
    //if the alarm exists, set isActive = true 
    if (exists) {
        alarmsArray[index].isActive = true;
    }
};

//stop alarm
//turn off the alarm when the checkbox is unchecked
const stopAlarm = (e) => {
    //get the data-id attribute from the parent div of the checkbox
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    //if the alarm exist: set isActive = false (turn it of)
    if (exists) {
        alarmsArray[index].isActive = false;
        //stop playing the alarm sound
        alarmSound.pause();
    }
};

//delete alarm
const deleteAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.
        getAttribute("data-id");
    //search for the alarm in alarmsArray
    let [exists, obj, index] = searchObject("id", searchId);
    //if the alarm exists: remove it from the HTML
    if (exists) {
        e.target.parentElement.parentElement.remove();
        //delete it from the alarmsArray
        alarmsArray.splice(index, 1);
    }
}

//function to start the timer when the page loads
window.onload = () => {

    for (let i = 0; i < 60; i++) {
        let newOption = document.createElement("option");
        newOption.value = i;
        newOption.text = i.toString();
        newOption.text = appendZero(i);
        
        minuteInput.appendChild(newOption);
    }
    


    for (let i = 0; i < 24; i++) {
        let newOption = document.createElement("option");
        newOption.value = i;
        newOption.text = i.toString();
        newOption.text = appendZero(i);

        hourInput.appendChild(newOption);
    }



    setInterval(displayTimer);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
};