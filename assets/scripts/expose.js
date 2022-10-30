// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const horn = document.getElementById('horn-select');
  const changedImage = document.querySelectorAll('img')[0];
  const newAudio = document.querySelector('audio');
  const clickedButton = document.querySelector('button');
  const volume = document.getElementById("volume");
  const volumeImage = document.querySelectorAll('img')[1];
  const jsConfetti = new JSConfetti();

  horn.addEventListener('change', (event) => {
    if (event.target.value == 'air-horn') {
      changedImage.src = 'assets/images/air-horn.svg'; // Set source path for air-horn image
    }
    if (event.target.value == 'car-horn') {
      changedImage.src = 'assets/images/car-horn.svg'; // Set source path for car-horn image
    }
    if (event.target.value == 'party-horn') {
      changedImage.src = 'assets/images/party-horn.svg'; // Set source path for party-horn image
    }
  });

  horn.addEventListener('input', (event) => {
    if (event.target.value == 'air-horn') {
      newAudio.src = 'assets/audio/air-horn.mp3'; // Set source path for air-horn audio
    }
    if (event.target.value == 'car-horn') {
      newAudio.src = 'assets/audio/car-horn.mp3'; // Set source path for car-horn audio
    }
    if (event.target.value == 'party-horn') {
      newAudio.src = 'assets/audio/party-horn.mp3'; // Set source path for party-horn audio
    }
  });

  volume.addEventListener('change', (event) => {
    if (event.target.value == 0) {
      volumeImage.src = 'assets/icons/volume-level-0.svg'; // Set volume for 0
    }
    if (event.target.value >= 1 && event.target.value < 33) {
      volumeImage.src = 'assets/icons/volume-level-1.svg'; // Set volume for 1-32
    }
    if (event.target.value >= 33 && event.target.value < 67) {
      volumeImage.src = 'assets/icons/volume-level-2.svg'; // Set volume for 33 - 66
    }
    if (event.target.value >= 67) {
      volumeImage.src = 'assets/icons/volume-level-3.svg'; // Set volume for 67+
    }
    newAudio.volume = event.target.value/100; // volume not out of 100
  });
  

  clickedButton.addEventListener('click', (event) => {
    newAudio.play(); // play audio when button is clicked
    if (horn.value == 'party-horn') { // only throw confetti for party-horn
      jsConfetti.addConfetti({
        emojis: ['🎉', '💖', '💕', '✨', '🌼', '🌸', '💓', '🌟', '⭐️'],
     });
    }
  });

}