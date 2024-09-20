const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const minutesInput = document.getElementById('input-minutes');
const secondsInput = document.getElementById('input-seconds');
const timerDisplay = document.getElementById('timer-display');
const progressCircle = document.querySelector('.progress-ring__circle');

let timerInterval;
let totalSeconds;
let timeLeft;
let isRunning = false;

/* Start or pause the timer */
function startPauseTimer() {
    if (!isRunning) {
        // Initialize timer based on input values
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        totalSeconds = minutes * 60 + seconds;

        if (totalSeconds > 0) {
            timeLeft = totalSeconds;
            timerInterval = setInterval(updateTimer, 1000);
            isRunning = true;
            startPauseButton.textContent = 'Pause';
            resetButton.disabled = false;
            minutesInput.disabled = true;
            secondsInput.disabled = true;
            updateProgress();
        }
    } else {
        // Pause the timer
        clearInterval(timerInterval);
        isRunning = false;
        startPauseButton.textContent = 'Start';
    }
}

/* Update the timer every second */
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        updateProgress();
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startPauseButton.textContent = 'Start';
        alert('Time is up!');
    }
}

/* Reset the timer */
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseButton.textContent = 'Start';
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    minutesInput.value = '';
    secondsInput.value = '';
    timerDisplay.textContent = '00:00';
    resetButton.disabled = true;
    updateProgress(880);
}

/* Update the progress bar based on time left */
function updateProgress() {
    const progress = (timeLeft / totalSeconds) * 880; // Adjust for total progress
    progressCircle.style.strokeDashoffset = progress;
}

/* Event listeners */
startPauseButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);