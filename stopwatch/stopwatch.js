const timeDisplay = document.querySelector("#timeDisplay");
const spButton = document.querySelector("#spButton");
const resetButton = document.querySelector("#resetButton");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hours = 0;
let minutes = 0;
let seconds = 0;

spButton.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1);
        spButton.innerHTML = "Stop"
    } else if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
        spButton.innerHTML = "Start"
    }
});
resetButton.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    centisecs = 0;
    timeDisplay.textContent = "00:00:00.00";
});

function updateTime() {
    elapsedTime = Date.now() - startTime;

    centisecs = Math.floor((elapsedTime / 10) % 60);
    seconds = Math.floor((elapsedTime / 1000) % 60);
    minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    centisecs = pad(centisecs);
    seconds = pad(seconds);
    minutes = pad(minutes);
    hours = pad(hours);

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}.${centisecs}`;

    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}