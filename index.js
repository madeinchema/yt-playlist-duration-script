// Durations' List Test
const durations = [
  '6:46',
  '10:31',
  '7:35',
  '7:36',
  '8:36',
  '5:08',
  '6:50',
  '8:16',
  '3:04',
  '7:46',
  '11:19',
  '8:47',
  '6:06',
  '6:37',
  '↵      7:19↵    ',
  '↵      11:09↵    ',
  '↵      10:10↵    ',
  '↵      9:44↵    ',
  '↵      3:25↵    ',
  '↵      6:51↵    ',
  '↵      2:03↵    ',
].map((time) => {
  const regex = /\d+:\d{2}/g;
  return time.match(regex).toString();
});

console.log(durations);
