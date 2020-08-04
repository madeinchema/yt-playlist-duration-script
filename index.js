/**
 * Get curated list of video durations
 */
const durations = [
  '3:15',
  '3:56',
  '6:31',
  '7:19',
  '4:57',
  '12:32',
  '7:42',
  '4:47',
  '6:03',
  '12:19',
  '3:31',
  '4:29',
  '6:41',
  '7:10',
  '7:31',
  '4:13',
  '4:41',
  '6:46',
  '8:00',
  '↵      5:34↵    ',
  '↵      4:40↵    ',
  '↵      5:07↵    ',
  '↵      10:32↵    ',
  '↵      4:06↵    ',
  '↵      7:31↵    ',
  '↵      3:49↵    ',
].map((time) => {
  const regex = /\d+:\d{2}/g;
  return time.match(regex).toString();
});

/**
 * Get a list with all de videos' lengths in seconds
 */
const timeSeconds = durations.map((time) => {
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
console.log(`${totalHours ? `${totalHours}:` : ''}${totalMinutes}:${remainingSecs}`);
