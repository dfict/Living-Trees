//initiate some things
var isPlaying = false;
let ranSample = 0;
let counter = 0;

const vol = new Tone.Volume(-12).toDestination();
const reverb = new Tone.Reverb({decay: 4, wet: .6}).connect(vol);
const fDel = new Tone.FeedbackDelay(".143", 0.6).connect(reverb);
const fDel2 = new Tone.FeedbackDelay(".25", 0.5).connect(reverb);
const silentPlayer = new Tone.Player("./sounds/silence.m4a");
silentPlayer.connect(reverb);
silentPlayer.loop = true;
mainPlayer = new Tone.Player().connect(reverb);
mainPlayer2 = new Tone.Player().connect(reverb);
mainPlayer3 = new Tone.Player().connect(reverb);
mainPlayer4 = new Tone.Player().connect(reverb);
mainPlayers = [mainPlayer, mainPlayer2 ,mainPlayer3, mainPlayer4];
player = new Tone.Player().connect(fDel);
player2 = new Tone.Player().connect(fDel);
player3 = new Tone.Player().connect(fDel);
player4 = new Tone.Player().connect(fDel2);
player5 = new Tone.Player().connect(fDel2);
player6 = new Tone.Player().connect(fDel2);
players = [player, player2, player3, player4, player5, player6];
playerCount = 0;
mainPlayerCount = 0;
function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

const samples = new Tone.ToneAudioBuffers({
  0 : "sounds/root/sample_0.mp3",
  1 : "sounds/gtr/cluster_1/sample_1.mp3",
	2 : "sounds/gtr/cluster_1/sample_2.mp3",
	3 : "sounds/gtr/cluster_1/sample_3.mp3",
	4 : "sounds/gtr/cluster_1/sample_4.mp3",
  5 : "sounds/gtr/cluster_1/sample_5.mp3",
  6 : "sounds/gtr/cluster_1/sample_6.mp3",
  7 : "sounds/gtr/cluster_1/sample_7.mp3",
	8 : "sounds/gtr/cluster_1/sample_8.mp3",
	9 : "sounds/gtr/cluster_1/sample_9.mp3",
	10 : "sounds/gtr/cluster_1/sample_10.mp3",
  11 : "sounds/gtr/cluster_1/sample_11.mp3",
  12 : "sounds/gtr/cluster_1/sample_12.mp3",
  13 : "sounds/gtr/cluster_1/sample_13.mp3",
	14 : "sounds/gtr/cluster_1/sample_14.mp3",
	15 : "sounds/gtr/cluster_1/sample_15.mp3",
	16 : "sounds/gtr/cluster_1/sample_16.mp3",
  17 : "sounds/gtr/cluster_1/sample_17.mp3",
  18 : "sounds/gtr/cluster_1/sample_18.mp3",
  19 : "sounds/gtr/cluster_1/sample_19.mp3",
	20 : "sounds/gtr/cluster_1/sample_20.mp3",
	21 : "sounds/gtr/cluster_1/sample_21.mp3",
	22 : "sounds/gtr/cluster_1/sample_22.mp3",
  23 : "sounds/gtr/cluster_1/sample_23.mp3",
  24 : "sounds/gtr/cluster_1/sample_24.mp3",
  25 : "sounds/gtr/cluster_1/sample_25.mp3",
	26 : "sounds/gtr/cluster_1/sample_26.mp3",
  27 : "sounds/gtr/cluster_2/sample_1.mp3",
	28 : "sounds/gtr/cluster_2/sample_2.mp3",
	29 : "sounds/gtr/cluster_2/sample_3.mp3",
	30 : "sounds/gtr/cluster_2/sample_4.mp3",
  31 : "sounds/gtr/cluster_2/sample_5.mp3",
  32 : "sounds/gtr/cluster_2/sample_6.mp3",
  33 : "sounds/gtr/cluster_2/sample_7.mp3",
	34 : "sounds/gtr/cluster_2/sample_8.mp3",
	35 : "sounds/gtr/cluster_2/sample_9.mp3",
	36 : "sounds/gtr/cluster_2/sample_10.mp3",
  37 : "sounds/gtr/cluster_2/sample_11.mp3",
  38 : "sounds/gtr/cluster_2/sample_12.mp3",
  39 : "sounds/gtr/cluster_2/sample_13.mp3",
	40 : "sounds/gtr/cluster_2/sample_14.mp3",
	41 : "sounds/gtr/cluster_2/sample_15.mp3",
	42 : "sounds/gtr/cluster_2/sample_16.mp3",
  43 : "sounds/gtr/cluster_2/sample_17.mp3",
  44 : "sounds/gtr/cluster_2/sample_18.mp3",
  45 : "sounds/gtr/cluster_2/sample_19.mp3",
	46 : "sounds/gtr/cluster_2/sample_20.mp3",
	47 : "sounds/gtr/cluster_2/sample_0.mp3",
	
}, () => {
  document.querySelector(".button").innerHTML = "play";
});

let x = 0; //keep track of playhead drawing
let isDrawing = false;
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.addEventListener('mousedown', e => {
  x = e.offsetX;
  counter = x;
  isDrawing = true;
});
canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    x = e.offsetX;
    counter = x;
  }
  canvas.addEventListener('mouseup', e => {
    isDrawing = false;
  });
});
ctx.fillStyle = "black";
function increment(evt) {
  if(isPlaying) {
    counter = counter + .14;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(counter, 0, 1, canvas.height)
    //the low d
    if (counter > 6) { 
      if (Math.floor(counter) % 4 == 0 && Math.random() > Math.random()*.8) {
        mainPlayerCount++;
        if (mainPlayerCount > 3) {
          mainPlayerCount = 0;
        }
        
        mainPlayers[mainPlayerCount].buffer = samples.get("0");
        mainPlayers[mainPlayerCount].start();    
      }
      if (Math.floor(counter) % 5 == 0 && Math.random() > Math.random()*.8) {
        playerCount++;
        console.log(playerCount);
        try{
          
          if (playerCount > 6) {
            playerCount = 0;
          }
          players[playerCount].buffer = samples.get(getRandomInt(25));
          players[playerCount].start();
        } catch(error){}    
      }
      if (Math.floor(counter) % 7 == 0 && Math.random() > Math.random()*.2) {
        playerCount++;
        console.log(playerCount);
        try{
          
          if (playerCount > 6) {
            playerCount = 0;
          }
          players[playerCount].buffer = samples.get(getRandomInt(25));
          players[playerCount].start();
        } catch(error){} 
      }
      if (counter > 100 && counter < 280) {
        if (Math.floor(counter) % 2 == 0 && Math.random() > Math.random()*.2) {
          try{
            player4.buffer = samples.get(getRandomInt(20) + 26);
            player4.start();
          } catch(error){}
        }
      }
      if (counter >= 290) {
        Tone.Transport.stop();
        document.querySelector(".button").innerHTML = "play";
        isPlaying = false;
      }
  }
}
  setTimeout(increment, (Math.random() * 60 + 70));
}

function init() {
  if (!isPlaying) {
    if (counter >= 290) {
      counter = 0;
    }
    isPlaying = true;
    document.querySelector(".button").innerHTML = "pause";
    Tone.start();
    Tone.Transport.start();
    silentPlayer.start();
    mainPlayer.buffer = samples.get("0");
    increment();
  }
  else {
    Tone.Transport.pause();
    document.querySelector(".button").innerHTML = "play";
    isPlaying = false;
  }
}
function adjustCanvas() {
  if (window.innerWidth > 600) {
    canvas.width = 290;
    canvas.height = 28;
  }
  else {
    canvas.width = 100;
  }
}

window.onresize = adjustCanvas;