const timeDisplay = document.querySelector("#timeDisplay");
const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
const resetButton = document.querySelector("#resetButton");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hours = 0;
let minutes = 0;
let seconds = 0;

startButton.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updatetime, 75);
    }
});
pauseButton.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});
resetButton.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    let startTime = 0;
    let elapsedTime = 0;
    let currentTime = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    timeDisplay.textContent = "00:00:00"
});

function updateTime() {
    elapsedTime = Date.now() - startTime;

    seconds = Math.floor((elapsedTime / 1000) % 60);
    minutes = Math.floor((elapsedTime / 1000 * 60) % 60);
    hours = Math.floor((elapsedTime / 1000 * 3600) % 60);

    timeDisplay.textContent = '${hours}:${minutes}:${seconds}';

    seconds = pad(seconds);
    minutes = pad(minutes);
    hours = pad(hours);

    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}