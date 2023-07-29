// Get elements from the DOM
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');

// Initialize variables
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let intervalId;

// Helper function to format time
function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update the display with the current elapsed time
function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

// Start or stop the stopwatch
function startStop() {
  if (isRunning) {
    clearInterval(intervalId);
  } else {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 1000);
  }
  isRunning = !isRunning;
  startStopBtn.textContent = isRunning ? 'Stop' : 'Start';
}

// Reset the stopwatch
function reset() {
  clearInterval(intervalId);
  elapsedTime = 0;
  updateDisplay();
  isRunning = false;
  startStopBtn.textContent = 'Start';
}

// Attach event listeners to buttons
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
