// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const inputTxt = document.querySelector("textarea");
  const voiceSelect = document.querySelector("select");
  const clickedButton = document.querySelector("button");
  const changedImage = document.querySelectorAll("img")[0];

  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase();
      const bname = b.name.toUpperCase();

      if (aname < bname) {
        return -1;
      } else if (aname == bname) {
        return 0;
      } else {
        return +1;
      }
    });

    const selectedIndex =
      voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = "";

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += " -- DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex = selectedIndex;
  }

  populateVoiceList();


  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  function speak() {
    if (synth.speaking) {
      console.error("speechSynthesis.speaking");
      return;
    }

    if (inputTxt.value !== "") {
      const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
      
      const selectedOption =
        voiceSelect.selectedOptions[0].getAttribute("data-name");

      for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
          break;
        }
      }
      synth.speak(utterThis);
    }
  }
  
  voiceSelect.onchange = function () {
  };

  clickedButton.addEventListener('click', (event) => {
    event.preventDefault();
    speak();
    inputTxt.blur();
    if (synth.speaking) {
      changedImage.src = 'assets/images/smiling-open.png';
      setInterval(displaySmile, 5000);
    }
  });
  
  function displaySmile () {
    changedImage.src = 'assets/images/smiling.png';
  }
}