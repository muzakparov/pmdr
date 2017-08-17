
var countdown;
var delay = 1000;
//progress bar
var elapsed=0;
var time;

var session = 25;
var rest = 5;
var sessionSeconds = session * 60;
var restSeconds = rest * 60;

var audioSession = new Audio('http://www.oringz.com/oringz-uploads/sounds-948-just-like-magic.mp3');
var audioBreak = new Audio('http://www.oringz.com/oringz-uploads/sounds-882-solemn.mp3');

var sessionMinutes = document.getElementById('sessionmin'),
  sessionMinus = document.getElementById('sessionminus'),
  sessionPlus = document.getElementById('sessionplus'),
  breakMinutes = document.getElementById('breakmin'),
  breakMinus = document.getElementById('breakminus'),
  breakPlus = document.getElementById('breakplus'),
  timer = document.getElementById('timer'),
  startSessionButton = document.getElementById('start'),
  pauseSessionButton = document.getElementById('pause'),
  resetSessionButton = document.getElementById('reset'),
  startBreakButton = document.getElementById('startBreak'),
  pauseBreakButton = document.getElementById('pauseBreak'),
  resetBreakButton = document.getElementById('resetBreak'),
  text1 = document.getElementById('text'),
  timerbox = document.querySelector(".timer"),
  
  progress= document.querySelector("#pomodoro .progress");
text1.innerHTML = "SET VALUES !";
sessionMinutes.innerHTML = ' ' + session + ' ';
breakMinutes.innerHTML = ' ' + rest + ' ';
timer.innerHTML = session + ':00';
displaySession('', 'none', 'none');
displayBreak('none', 'none', 'none');

function startCountdown(seconds) {

  var minutes = parseInt(seconds / 60);
  var remainingSeconds = seconds % 60;
  if (remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;
  timer.innerHTML = minutes + ':' + remainingSeconds;

}

function startSession() {
  audioSession.play();
  timerbox.style.color = "white";
  timer.innerHTML = 'Go';
  text1.innerHTML = "SESSION";
  clearInterval(countdown);
  time=sessionSeconds;
  countdown = setInterval(function() {
    startCountdown(sessionSeconds);
    if (sessionSeconds === 0) {
      clearInterval(countdown);
      restSeconds = rest * 60;
      displaySession('none', 'none', 'none');
      elapsed=0;
      startBreak();
    } else{
      sessionSeconds--;
      elapsed++;
      setProgressPosition();
    }
      
  }, delay);
  displaySession('none', '', '');
}

function startBreak() {
  audioBreak.play();
  timerbox.style.color = "red";
  text1.innerHTML = "BREAK";
  timer.innerHTML = 'break';
  time=restSeconds;
  clearInterval(countdown);
  countdown = setInterval(function() {
    startCountdown(restSeconds);

    if (restSeconds === 0) {
      clearInterval(countdown);
      sessionSeconds = session * 60;
      displayBreak('none', 'none', 'none');
      startSession();
    } else {
      restSeconds--;
      elapsed++;
      setProgressPosition();
    }
  }, delay);
  displayBreak('none', '', '');
}

function pauseSession() {
  clearInterval(countdown);
  displaySession('', 'none', 'none');
  startSessionButton.innerHTML = 'resume';
}

function pauseBreak() {
  clearInterval(countdown);
  displayBreak('', 'none', 'none');
  startBreakButton.innerHTML = 'resume';
}

function resetSession() {
  pauseSession();
  elapsed=0;
  setProgressPosition();
  sessionSeconds = session * 60;
  timer.innerHTML = session + ':00';
  startSessionButton.innerHTML = 'start';
}

function resetBreak() {
  pauseBreak();
  elapsed=0;
  setProgressPosition();
  restSeconds = rest * 60;
  timer.innerHTML = rest + ':00';
  startBreakButton.innerHTML = 'start';
}

function subtractSession() {
  session--;
  if (session < 0) session = 0;
  sessionSeconds = session * 60;
  sessionMinutes.innerHTML = ' ' + session + ' ';
}

function subtractBreak() {
  rest--;
  if (rest < 0) rest = 0;
  restSeconds = rest * 60;
  breakMinutes.innerHTML = ' ' + rest + ' ';
}

function addSession() {
  session++;
  sessionSeconds = session * 60;
  sessionMinutes.innerHTML = ' ' + session + ' ';
}

function addBreak() {
  rest++;
  restSeconds = rest * 60;
  breakMinutes.innerHTML = ' ' + rest + ' ';
}

function displaySession(start, pause, reset) {
  startSessionButton.style.display = start;
  pauseSessionButton.style.display = pause;
  resetSessionButton.style.display = reset;
}

function displayBreak(start, pause, reset) {
  startBreakButton.style.display = start;
  pauseBreakButton.style.display = pause;
  resetBreakButton.style.display = reset;
}

function setProgressPosition() {
  var percentComplete = (elapsed / time) * 100;
  var top = (100 - percentComplete);
  progress.style.top = top + "%";
}

sessionMinus.addEventListener('click', subtractSession);
sessionPlus.addEventListener('click', addSession);
breakMinus.addEventListener('click', subtractBreak);
breakPlus.addEventListener('click', addBreak);
startSessionButton.addEventListener('click', startSession);
pauseSessionButton.addEventListener('click', pauseSession);
resetSessionButton.addEventListener('click', resetSession);
startBreakButton.addEventListener('click', startBreak);
pauseBreakButton.addEventListener('click', pauseBreak);
resetBreakButton.addEventListener('click', resetBreak);