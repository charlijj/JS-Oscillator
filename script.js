// For typing activation
// ----------------------------------------------------------------------------------------------------------
document.addEventListener(`keydown`, function () {

  noteOn(event.code, event.repeat);

});


function noteOn (key, repeat) {


  // Removes overlapping distortion when key is held
  if (repeat)
  {
    return;
  }

  // Remove any previous effects on the gain node
  gainNode.gain.cancelScheduledValues(audioCtx.currentTime);

  let active_key;
  gainNode.gain.value = 0.33;

  console.log(key);
  let note;

  switch (event.code)
  {
    // C3
    case `KeyZ`:
      note = notelist.c3;
      active_key = `c3`;
      break;
    // C#3
    case `KeyW`:
      note = notelist.c3sharp;
      active_key = `c3sharp`;
      break;
    // D3
    case `KeyX`:
      note = notelist.d3;
      active_key = `d3`;
      break;
    // D#3
    case `KeyE`:
      note = notelist.d3sharp;
      active_key = `d3sharp`;
      break;
    // E3
    case `KeyC`:
      note = notelist.e3;
      active_key = `e3`;
      break;
    // F3
    case `KeyV`:
      note = notelist.f3;
      active_key = `f3`;
      break;
    // F#3
    case `KeyR`:
      note = notelist.f3sharp;
      active_key = `f3sharp`;
      break;
    // G3
    case `KeyB`:
      note = notelist.g3;
      active_key = `g3`;
      break;
    // G#3
    case `KeyT`:
      note = notelist.g3sharp;
      active_key = `g3sharp`;
      break;
    // A3
    case `KeyN`:
      note = notelist.a3;
      active_key = `a3`;
      break;
    // A#3
    case `KeyY`:
      note = notelist.a3sharp;
      active_key = `a3sharp`;
      break;
    // B3
    case `KeyM`:
      note = notelist.b3;
      active_key = `b3`;
      break;
    // B3
    case `KeyA`:
      note = notelist.b3;
      active_key = `b3`;
      break;
    // C4
    case `KeyS`:
      note = notelist.c4;
      active_key = `c4`;
      break;
    // C#4
    case `KeyU`:
      note = notelist.c4sharp;
      active_key = `c4sharp`;
      break;
    // D4
    case `KeyD`:
      note = notelist.d4;
      active_key = `d4`;
      break;
    // D#4
    case `KeyI`:
      note = notelist.d4sharp;
      active_key = `d4sharp`;
      break;
    // E4
    case `KeyF`:
      note = notelist.e4;
      active_key = `e4`;
      break;
    // F4
    case `KeyG`:
      note = notelist.f4;
      active_key = `f4`;
      break;
    // C#4
    case `KeyO`:
      note = notelist.f4sharp;
      active_key = `f4sharp`;
      break;
    // G4
    case `KeyH`:
      note = notelist.g4;
      active_key = `g4`;
      break;
    // G#4
    case `KeyP`:
      note = notelist.g4sharp;
      active_key = `g4sharp`;
      break;
    // A4
    case `KeyJ`:
      note = notelist.a4;
      active_key = `a4`;
      break;
    // A#4
    case `BracketLeft`:
      note = notelist.a4sharp;
      active_key = `a4sharp`;
      break;
    // B4
    case `KeyK`:
      note = notelist.b4;
      active_key = `b4`;
      break;

    // C5
    case `KeyL`:
      note = notelist.c5;
      active_key = `c5`;
      break;
    default:
      console.log(event.code)
      alert(`Key has not been mapped yet`);

  }

  // To determine sustain depending on waveform
  switch (wave)
  {

    case `sine`:
      sustain = 0.09;
      break;
    case `triangle`:
      sustain = 0.09;
      break;
    default:
      sustain = 0.5;
  }

  let timeoutsus = sustain * 1000;

  document.getElementById(active_key).style.backgroundColor = `grey`;
  setTimeout(function () {document.getElementById(active_key).style.backgroundColor = null;}, timeoutsus);

  const osci = audioCtx.createOscillator();
  osci.type = wave;
  osci.frequency.value = note;

  osci.connect(gainNode);
  
  gainNode.gain.setValueAtTime(0.33, audioCtx.currentTime);

  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + sustain);
  osci.start();
  setTimeout(function () {osci.stop()}, timeoutsus);

}





// ----------------------------------------------------------------------------------------------------------

// Div of canvas
const container = document.getElementById(`container`);

// Drawing area
const canvas = document.getElementById(`canvas1`);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// To get access to 2D library
const ctx = canvas.getContext(`2d`);

// ----------------------------------------------------------------------------------

const notelist = {

  c3:130.81,
  c3sharp:138.59,
  d3:146.83,
  d3sharp:155.56,
  e3:164.81,
  f3:174.61,
  f3sharp:185.00,
  g3:196.00,
  g3sharp:207.65,
  a3:220.00,
  a3sharp:233.08,
  b3:246.94,

  c4:261.63,
  c4sharp:277.18,
  d4:293.66,
  d4sharp:311.13,
  e4:329.63,
  f4:349.23,
  f4sharp:369.99,
  g4:392.00,
  g4sharp:415.30,
  a4:440.00,
  a4sharp:466.16,
  b4:493.88,

  c5:523.25
};
// Main audio competent
const audioCtx = new AudioContext();

// Variable to hold waveform type value
let wave;
wave = `square`;
// Variable to hold sustain value
let sustain;

const demo = new Audio(`demo.mp3`);
let audioSource = audioCtx.createMediaElementSource(demo);

// Gain for oscillator
let gainNode = audioCtx.createGain();

// Gain for Demo
let demoGain = audioCtx.createGain();
demoGain.gain.setValueAtTime(0.20, audioCtx.currentTime);

// Waveform dropdown
const waveForm = document.getElementById(`waveForm`);
waveForm.value = wave;
waveForm.onchange = function () {wave = waveForm.value};
console.log(`now playing: ` + wave);

const playPauseDemo = document.getElementById(`playDemo`);
playPauseDemo.value = `Play Demo`;
let playPauseText = playPauseDemo.value;

playPauseDemo.addEventListener(`click`, function () {

    if (demo.paused)
    {
      demo.play();
      playPauseDemo.value = `Pause`;
      console.log(`playing demo`); 
      console.log(playPauseDemo.value);
    }
    else
    {
      demo.pause();
      playPauseDemo.value = `Play Demo`;
      console.log(`pausing demo`);
    }

    setTimeout(function () {playPauseDemo.value = `Play Demo`}, 40000);

});

// Analyzer for drawing graph
let analyzer = audioCtx.createAnalyser();
audioSource.connect(demoGain);
gainNode.connect(analyzer);
demoGain.connect(analyzer);
analyzer.connect(audioCtx.destination);

// Half of fftSize, is the number of bars to be drawn by vizulizer
analyzer.fftSize = 1024;

const bufferLen = analyzer.frequencyBinCount;

const dataArray = new Uint8Array(bufferLen);

const barWidth = canvas.width / bufferLen;
let barHeight;
let x;



// ----------------------------------------------------------------------------------
animate();

function animate () {

  x = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  analyzer.getByteFrequencyData(dataArray);

  for (let i = 0; i < bufferLen; i++)
  {
      barHeight = dataArray[i] + 250;
      ctx.fillStyle = `red`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 5;
  }
  requestAnimationFrame(animate);
}









