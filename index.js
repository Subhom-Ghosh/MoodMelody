const quotes = [
    '"Music is what feelings sound like." – Unknown',
    '"Without music, life would be a mistake." – Friedrich Nietzsche',
    '"Where words fail, music speaks." – Hans Christian Andersen',
    '"One good thing about music, when it hits you, you feel no pain." – Bob Marley',
    '"Music expresses that which cannot be said and on which it is impossible to be silent." – Victor Hugo'
];

document.addEventListener("DOMContentLoaded", function () {
    const quoteElement = document.getElementById("quote");

    setInterval(() => {
        quoteElement.style.opacity = "0"; 
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteElement.textContent = quotes[randomIndex];
            quoteElement.style.opacity = "1"; 
        }, 500);
    }, 3000); 
});
const musicEmojis = ["💛"];

let lastX = 0, lastY = 0;
let sparkleInterval;
let isMoving = false;

// Function to create a sparkle
function createSparkle() {
  if (!isMoving) return; // Stop sparkles when the cursor stops

  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';

  // Select a random emoji
  sparkle.innerText = musicEmojis[Math.floor(Math.random() * musicEmojis.length)];

  // Position the sparkle at the last cursor location
  sparkle.style.left = `${lastX}px`;
  sparkle.style.top = `${lastY}px`;

  document.body.appendChild(sparkle);

  // Remove sparkle after animation
  setTimeout(() => {
    sparkle.remove();
  }, 2500);
}

// Function to handle cursor movement
function handleMouseMove(e) {
  lastX = e.pageX;
  lastY = e.pageY;

  if (!isMoving) {
    isMoving = true;
    sparkleInterval = setInterval(createSparkle, 1000); // Start sparkles
  }

  // Clear timeout for stopping sparkles
  clearTimeout(stopTimeout);
  stopTimeout = setTimeout(() => {
    isMoving = false;
    clearInterval(sparkleInterval); // Stop sparkles after no movement
  }, 500); // Stops after 1.5s of no movement
}

// Track mouse movement
let stopTimeout;
document.addEventListener('mousemove', handleMouseMove);
// Set interval to create a sparkle every 1 second
setInterval(createSparkle, 250);
// Click to open get started
document.getElementById("getstarted").addEventListener("click",function(){
    window.location= "loading.html"
});