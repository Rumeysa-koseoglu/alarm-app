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
    let alarmObject, // Variable to store the object we found
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