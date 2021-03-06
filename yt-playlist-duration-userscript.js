// ==UserScript==
// @name           YT Playlist Duration Script
// @namespace      https://github.com/madeinchema/yt-playlist-duration-script
// @version        1.0
// @description    Use this script to get the total duration of a YouTube playlist.
// @author         https://github.com/madeinchema
// @include        https://www.youtube.com/playlist?list=*
// @run-at         document-end
// ==/UserScript==

/**
 * YT Playlist Duration Script
 */
function runScript() {
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
   */
  let secondsLeft = totalSeconds % 60;
  let minutesLeft = Math.floor(totalSeconds / 60);
  let totalHours = 0;

  // If total length > 1hr, calculate hours and update minutesLeft
  if (totalSeconds > 3600) {
    totalHours = Math.floor(totalSeconds / 3600);
    minutesLeft = Math.floor(totalSeconds / 60 - totalHours * 60);
  }

  // If seconds < 10, apply the format "SS" by passing a zero
  secondsLeft = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
  // If minutes < 60, apply the format "MM" by passing a zero
  minutesLeft = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;

  // Log the formatted total time in the console
  console.log('⏬ This is the total duration of the playlist ⏬');
  console.log(`${totalHours ? `${totalHours}:` : ''}${minutesLeft}:${secondsLeft}`);
}

/**
 * Check whether there's any video length element rendered
 * Then set a timeout to ensure they are all rendered, and start the actual script
 */
const existCondition = setInterval(() => {
  if (document.querySelector('ytd-thumbnail-overlay-time-status-renderer')) {
    clearInterval(existCondition);
    setTimeout(() => {
      runScript();
    }, 1000);
  }
}, 100); // check every 100ms
