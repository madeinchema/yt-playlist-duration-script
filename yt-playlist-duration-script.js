/**
 * Create an array of videoLengths
 * We use regex to make sure
 */
const videoLengths = [
  ...document.querySelectorAll('ytd-thumbnail-overlay-time-status-renderer span'),
].map((time) => time.innerText.replace(/↵/g, '').trim().toString());

/**
 * Get the total amount of seconds of all videos combined
 */
const totalSeconds = videoLengths.reduce((accumulator, videoLength) => {
  // Creates an array which will include hours or not depending on the videoLength passed
  const time = videoLength.split(':').map(parseFloat);
  let seconds = 0;

  // Calculates and returns totalSeconds of videoLength depending on the presence of hours in it
  seconds += time.length === 3 ? time[0] * 3600 : time[0] * 60;
  seconds += time.length === 3 ? time[1] * 60 : time[1];
  seconds += time.length === 3 ? time[2] : 0;
  return accumulator + seconds;
}, 0);

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
