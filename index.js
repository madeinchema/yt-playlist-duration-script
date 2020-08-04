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
 * Get a list with all de videos' lengths in seconds
 */
const timeSeconds = videoLengths.map((time) => {
  const mins = +time.split(':')[0];
  const secs = +time.split(':')[1];
  return mins * 60 + secs;
});

/**
 * Get and format the total time
 */
// Add up all the videos' lengths
const totalSeconds = timeSeconds.reduce((totalTime, nextValue) => totalTime + nextValue);

// Get the remaining seconds
const remainingSecs = totalSeconds % 60;

// Get the total minutes
let totalMinutes = Math.floor(totalSeconds / 60);

// If totalLength > 1h:
let totalHours;
if (totalMinutes >= 60) {
  // Get the total hours
  totalHours = Math.floor(totalMinutes / 60);
  // Update actualMinutes to reflect the remaining minutes after subtracting the hours
  totalMinutes %= totalHours * 60;
}

// Log the formatted total time in the console
console.log('⏬ This is the total duration of the playlist ⏬');
console.log(`${totalHours ? `${totalHours}:` : ''}${totalMinutes}:${remainingSecs}`);
