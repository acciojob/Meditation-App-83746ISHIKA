const video = document.getElementById('video');
const audio = document.getElementById('audio');
const playButton = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');

let duration = 600; // default 10 mins
let currentMeditation = 'beach'; // default

// Time buttons
document.getElementById('smaller-mins').onclick = () => setDuration(120);
document.getElementById('medium-mins').onclick = () => setDuration(300);
document.getElementById('long-mins').onclick = () => setDuration(600);

function setDuration(time) {
  duration = time;
  updateTimeDisplay(duration);
}

function updateTimeDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function setMeditation(type) {
  currentMeditation = type;
  video.src = `Sounds/${type}.mp4`;
  audio.src = `Sounds/${type}.mp3`;
  video.load();
  audio.load();
  if (!audio.paused) {
    audio.play();
    video.play();
  }
}

let interval;
playButton.onclick = () => {
  if (audio.paused) {
    audio.play();
    video.play();
    playButton.textContent = 'Pause';
    startTimer(duration);
  } else {
    audio.pause();
    video.pause();
    playButton.textContent = 'Play';
    clearInterval(interval);
  }
};

function startTimer(time) {
  let remaining = time;
  updateTimeDisplay(remaining);

  interval = setInterval(() => {
    remaining--;
    updateTimeDisplay(remaining);

    if (remaining <= 0) {
      clearInterval(interval);
      audio.pause();
      video.pause();
      audio.currentTime = 0;
      video.currentTime = 0;
      playButton.textContent = 'Play';
      updateTimeDisplay(duration);
    }
  }, 1000);
}

// Initial time
updateTimeDisplay(duration);

