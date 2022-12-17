//Query Selectors
var spieler = document.querySelector(".player");
var spielfeld = document.querySelector(".playground");
var spielfeld = document.querySelector(".playground");
var punkteAnzeige = document.querySelector(".punkte");

// Variablen
var backgroundPosition = 0;
var score = 0;
var highscore = 0;
var musik = new Audio("assets/sound/trheelittlebirds.mp3");
var sprung = new Audio("assets/sound/jump.wav");
var gameoversound = new Audio("assets/sound/gameover_sound.wav");
var gameovermusik = new Audio("assets/sound/gameover_musik.wav");

spieler.style.left = "50px";
spieler.style.bottom = "0px";
spieler.style.top = "205px";
spieler.style.height = "70px";

//Timer
var timerspielerfallen = new Timer(40);
var timercounter = new Timer(10);

//Functions
function springen() {
  spieler.style.top = parseInt(spieler.style.top) - 100 + "px";
}

function fallen() {
  spieler.style.top = parseInt(spieler.style.top) + 100 + "px";
}

function ducken() {
  spieler.style.height = parseInt(spieler.style.height) - 30 + "px";
  spieler.style.top = parseInt(spieler.style.top) + 30 + "px";
}

function aufstehen() {
  spieler.style.height = parseInt(spieler.style.height) + 30 + "px";
  spieler.style.top = parseInt(spieler.style.top) - 30 + "px";
}

function trommelspawnen() {
  var h = document.createElement("div");
  h.classList.add("trommel");
  h.style.bottom = "0px";
  h.style.right = "0px";
  spielfeld.appendChild(h);
}

function vogelspawnen() {
  var b = document.createElement("div");
  b.classList.add("vogel");
  b.style.bottom = "100px";
  b.style.right = "-150px";
  spielfeld.appendChild(b);
}

function gameover() {
  musik.pause();
  gameoversound.play();
  gameovermusik.play();
  alert("Game over!" + "Punkte in dieser Runde: " + score);
}

function counterobjektespawnen() {
  var a = document.createElement("div");
  a.classList.add("counterobjekt");
  a.style.bottom = "0px";
  a.style.right = "0px";
  spielfeld.appendChild(a);
}

//loop
function loop() {
  // Sound
  musik.play();
  if (parseInt(spieler.style.top) < 205) {
    sprung.play();
  }
  // Zufällig Timer für Hindernisse
  let zufallszahltimmertrommel = Math.random() * 200;
  var timertrommel = new Timer(zufallszahltimmertrommel);

  let zufallszahltimmervogel = Math.random() * 800;
  var timervogel = new Timer(zufallszahltimmervogel);

  // Springen
  if (keyboard(32) && parseInt(spieler.style.top) == 205) {
    springen();
  }
  if (parseInt(spieler.style.top) < 205 && timerspielerfallen.ready()) {
    fallen();
  }
  // ducken und aufstehen
  if (
    keyboard(16) &&
    parseInt(spieler.style.height) == 70 &&
    parseInt(spieler.style.top) == 205
  ) {
    ducken();
  }
  if (parseInt(spieler.style.height) < 70 && timerspielerfallen.ready()) {
    aufstehen();
  }

  // Trommel Hinderniss spawnen
  if (timertrommel.ready()) {
    trommelspawnen();
  }
  // Trommel bewegen
  var trommeln = document.querySelectorAll(".trommel");
  for (var trommel of trommeln) {
    trommel.style.right = parseInt(trommel.style.right) + 5 + "px";
    if (parseInt(trommel.style.right) > 1280) {
      trommel.parentNode.removeChild(trommel);
    }
  }

  // Vogel Hinderniss spawnen
  if (timervogel.ready()) {
    vogelspawnen();
  }
  // Vogel bewegen
  var vogeln = document.querySelectorAll(".vogel");
  for (var vogel of vogeln) {
    vogel.style.right = parseInt(vogel.style.right) + 5 + "px";
    if (parseInt(vogel.style.right) > 1280) {
      vogel.parentNode.removeChild(vogel);
    }
  }

  // gegner erkennen und game over
  if (anyCollision(spieler, trommeln)) {
    gameover();
    return;
  }

  if (anyCollision(spieler, vogeln)) {
    gameover();
    return;
  }

  // Counter objekt spawnen
  if (timercounter.ready()) {
    counterobjektespawnen();
  }
  // counterobjekt bewegen
  var counterobjekte = document.querySelectorAll(".counterobjekt");
  for (var counterobjekt of counterobjekte) {
    counterobjekt.style.right = parseInt(counterobjekt.style.right) + 5 + "px";
    if (parseInt(counterobjekt.style.right) > 1280) {
      counterobjekt.parentNode.removeChild(counterobjekt);
    }
  }

  // Counterobjekt zählen
  if (anyCollision(spieler, counterobjekte)) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }
  // Background
  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
