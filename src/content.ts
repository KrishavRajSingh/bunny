// src/content.ts
interface Window {
  webkitSpeechRecognition: any
}

interface SpeechRecognitionEvent{
  results: SpeechRecognitionResultList
}
console.log("Content script running");

// Send a message to the background script
chrome.runtime.sendMessage({ type: "HELLO" }, (response) => {
  console.log("Received response:", response);
});

// Example: Modify the page content
function modifyPage() {
  const app = document.createElement('div');
  app.id = 'my-extension-root';
  app.textContent = 'Hello from Next.js Chrome Extension!';
  document.body.appendChild(app);
}

// Run the modification after the page is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', modifyPage);
} else {
  modifyPage();
}

let isListening = false;
let recognition: any = null;

function startHearing(popup: HTMLDivElement){
  try{
    console.log('reached');
    
    if('webkitSpeechRecognition' in window){
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      console.log('reached2');
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        console.log('results', event.results);
        const results = event.results[event.results.length-1];
        console.log(results, 'kk');
        const transcript = results[0].transcript;
        popup.innerText = transcript;
      }
      recognition.start();
    }else{
      console.error('webkitSpeechRecognition not supported');
      popup.textContent = "Speech Recognition not supported";
    }
  }catch(err){
    console.log(err, "error");
    
  }
}

function stopHearing(){
  if(recognition){
    recognition.stop();
  }
}

function createRedButton() {
  const button = document.createElement('button');
  button.textContent = 'Click to Listen';
  button.style.backgroundColor = 'red';
  button.style.color = 'white';
  button.style.padding = '10px 20px';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '9999';

  const popup = document.createElement('div');
    popup.id = 'pop-up';
    popup.textContent = 'Listening....';
    popup.style.backgroundColor = 'green';
    popup.style.color = 'white';
    popup.style.padding = '10px 20px';
    popup.style.border = 'none';
    popup.style.borderRadius = '5px';
    popup.style.cursor = 'pointer';
    popup.style.position = 'fixed';
    popup.style.bottom = '60px';
    popup.style.right = '20px';
    popup.style.zIndex = '1000';
    popup.style.display = "none";

  button.addEventListener('click', () => {
    isListening = !isListening;
    button.textContent = isListening? "Click to Stop": "Click to Listen";
    button.style.backgroundColor = isListening? "green": "red";
    popup.style.display = isListening? "block": "none";

    if(isListening){
      popup.textContent = "Listening...";
      startHearing(popup);
    }else{
      stopHearing();
      popup.textContent = "Listening...";
    }
    console.log('Red button clicked!');
    
  });

  document.body.appendChild(button);
  document.body.appendChild(popup);
}

createRedButton();