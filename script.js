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