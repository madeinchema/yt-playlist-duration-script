/**
 * Get curated list of video durations
 */
const videoLengths = [
  ...document.querySelectorAll('ytd-thumbnail-overlay-time-status-renderer span'),
]
  .map((span) => span.innerText)
  .map((time) => {
    const regex = /\d+:\d{2}/g;
    return time.match(regex).toString();
  });

/**
 * Get the total amount of seconds
 */
const totalSeconds = videoLengths
  .map((time) => {
    const mins = +time.split(':')[0];
    const secs = +time.split(':')[1];
    return mins * 60 + secs;
  })
  .reduce((prevTime, currentTime) => prevTime + currentTime, 0);

/**
 * Get and format the total time
 * Get the remaining seconds:
 */
const secondsLeft = totalSeconds % 60;

// Get the total minutes
let minutesLeft = Math.floor(totalSeconds / 60);

// Get the total hours. If there are any, update the minutesLeft by subtracting the hours
let totalHours;
if (minutesLeft >= 60) {
  totalHours = Math.floor(minutesLeft / 60);
  minutesLeft %= totalHours * 60;
}

// Log the formatted total time in the console
console.log('⏬ This is the total duration of the playlist ⏬');
console.log(`${totalHours ? `${totalHours}:` : ''}${minutesLeft}:${secondsLeft}`);
