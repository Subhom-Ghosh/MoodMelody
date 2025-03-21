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
const musicEmojis = ["💛","💚"];
let lastX = 0, lastY = 0;
let sparkleInterval;
let isMoving = false;


function createSparkle() {
  if (!isMoving) return; 

  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';


  sparkle.innerText = musicEmojis[Math.floor(Math.random() * musicEmojis.length)];


  sparkle.style.left = `${lastX}px`;
  sparkle.style.top = `${lastY}px`;

  document.body.appendChild(sparkle);


  setTimeout(() => {
    sparkle.remove();
  }, 2500);
}

function handleMouseMove(e) {
  lastX = e.pageX;
  lastY = e.pageY;

  if (!isMoving) {
    isMoving = true;
    sparkleInterval = setInterval(createSparkle, 1000); 
  }

  
  clearTimeout(stopTimeout);
  stopTimeout = setTimeout(() => {
    isMoving = false;
    clearInterval(sparkleInterval); 
  }, 500); 
}

let stopTimeout;
document.addEventListener('mousemove', handleMouseMove);

setInterval(createSparkle, 250);

document.getElementById("getstarted").addEventListener("click",function(){
    window.location= "loading.html"
});

document.getElementById("loginBtn").addEventListener("click",function(){
  alert("Login Will be enabled soon--- please click Getstarted")
});
document.getElementById("signupBtn").addEventListener("click",function(){
  alert("Signup Will be enabled soon--- please click Getstarted")
});