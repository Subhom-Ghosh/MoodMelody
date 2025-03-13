const moodSongs = {
    "happy": [
        "https://open.spotify.com/track/1ccZZf0IQi5y0bHMl2aGDF?si=0e5924ba3be44d23",
        "https://open.spotify.com/track/7hXnhouVPnOnFwCGrQMHvB?si=dac2d396eb784ce6",
        "https://open.spotify.com/track/49Qzz8wqpDisEAOFSmPR36?si=78823812ae974c8b",
        "https://open.spotify.com/track/62zIWoHyrYwLaCqTo80h2m?si=d0950f4024174d3d",
    ],
    "love": [
        "https://open.spotify.com/track/6oARlKW177BrmouSR9AW6d?si=177642601afa4c13",
        "https://open.spotify.com/track/1YMLgvsQdE27r30q0fsLeV",
        "https://open.spotify.com/track/0fCQRUbk8LIQTdQYGNtGyv",
        "https://open.spotify.com/track/4km0RUkMMFdx8iDuq36o2w?si=3014332b03644a2b",
    ],
    "romantic": [
        "https://open.spotify.com/track/64FRYkm2cwtq6KCdMPwKnC",
        "https://open.spotify.com/track/7wn8hTR0dPwRsYfDKZ54bi",
        "https://open.spotify.com/track/52itZ0w0CydihB2JCZEIft?si=459539886b96472d",
    ],
    "sad": [
        "https://open.spotify.com/track/6xoRs4VCCweNxiaUDJyfNV",
        "https://open.spotify.com/track/1EjxJHY9A6LMOlvyZdwDly"
    ],
    "energetic": [
        "https://open.spotify.com/track/18AId3X5GULxDCCjyRTCIQ?si=8c3876281de24f41",
        "https://open.spotify.com/track/40cObYpYCK89z6lOKouUBq?si=81b747aedbaa459f",
        "https://open.spotify.com/track/7b8HvoL1FmRshQpE6CBC9J?si=028a9b9cbd3547df",
        "https://open.spotify.com/track/2S6okBMEo9oWCbdWGrxth3?si=bf2ddb1c8fdc41c4",
        "https://open.spotify.com/track/2nP1wLRh85mo5Wdj4RQldp?si=4e8788d647bc4263",
        "https://open.spotify.com/track/06Msa3uWRQFj5mNkyJdinw?si=dadd715933f6456d",
        "https://open.spotify.com/track/6tjzeB1k0x9paSlMsGKE2V?si=daf9c1a219134cca",

    ],
    "relaxed": [
        
        "https://open.spotify.com/track/5PUXKVVVQ74C3gl5vKy9Li?si=e2bae671295e46fe",
        "https://open.spotify.com/track/7wZm6u4DZg5wAuvNb6meTQ",
        "https://open.spotify.com/track/510xfz7G0qD0cOpddH5yHr",
        "https://open.spotify.com/track/52U5zPk1KSjwzt7OAeFF4t?si=25c2a3e8bd0340d0",
        "https://open.spotify.com/track/6FJixplJkAFQuaQRZ1LQxq?si=a12bbea7a3634e3f",
        "https://open.spotify.com/track/6oARlKW177BrmouSR9AW6d?si=bb45bcff64194e24",
    ]
};

function playMusic() {
    let mood = document.getElementById("mood").value;
    let songs = moodSongs[mood];

    if (songs && songs.length > 0) {
        let randomSong = songs[Math.floor(Math.random() * songs.length)];
        let trackID = randomSong.split("/track/")[1]?.split("?")[0];
        let spotifyDeepLink = `spotify:track:${trackID}`;

       
        window.location.href = spotifyDeepLink;

        
        let spotifyLinkElement = document.getElementById("spotify-link");
        let songLinkContainer = document.getElementById("song-link");

        if (spotifyLinkElement && songLinkContainer) {
            spotifyLinkElement.href = randomSong;
            spotifyLinkElement.innerText = "🎵 Open in Spotify";
            songLinkContainer.style.display = "block";
        } else {
            console.error("spotify-link element not found!");
        }
    } else {
        alert("No songs available for this mood!");
    }
}
const musicEmojis = ["🎶"];

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
