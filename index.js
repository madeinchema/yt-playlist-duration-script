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
 * Get total time
 */

const timeSeconds = durations.map((time) => {
  const mins = +time.split(':')[0];
  const secs = +time.split(':')[1];
  return mins * 60 + secs;
});

const totalSeconds = timeSeconds.reduce((totalTime, nextValue) => totalTime + nextValue);
const remainingSecs = totalSeconds % 60;
let actualMinutes = Math.floor(totalSeconds / 60);
const actualHours = Math.floor(actualMinutes / 60);
actualMinutes %= actualHours * 60;

console.log(`${actualHours}:${actualMinutes}:${remainingSecs}`);
