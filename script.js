
document.addEventListener('keydown', function () {

  noteOn(event.code, event.repeat);

});


let i=0;
function noteOn (key, repeat) {

  gainNode.gain.cancelScheduledValues(audioCtx.currentTime);

  let active_key;

  gainNode.gain.value = 0.33;

  console.log(key);
  let note;

  switch (event.code)
  {
    // C3
    case 'KeyZ':
      note = notelist.c3;
      active_key = 'c3';
      break;

    // D3
    case 'KeyX':
      note = notelist.d3;
      active_key = 'd3';
      break;
    // E3
    case 'KeyC':
      note = notelist.e3;
      active_key = 'e3';
      break;
    // F3
    case 'KeyV':
      note = notelist.f3;
      active_key = 'f3';
      break;
    // G3
    case 'KeyB':
      note = notelist.g3;
      active_key = 'g3';
      break;
    // A3
    case 'KeyN':
      note = notelist.a3;
      active_key = 'a3';
      break;
    // B3
    case 'KeyM':
      note = notelist.b3;
      active_key = 'b3';
      break;
    // B3
    case 'KeyA':
      note = notelist.b3;
      active_key = 'b3';
      break;
    // C4
    case 'KeyS':
      note = notelist.c4;
      active_key = 'c4';
      break;
    // D4
    case 'KeyD':
      note = notelist.d4;
      active_key = 'd4';
      break;
    // E4
    case 'KeyF':
      note = notelist.e4;
      active_key = 'e4';
      break;
    // F4
    case 'KeyG':
      note = notelist.f4;
      active_key = 'f4';
      break;
    // G4
    case 'KeyH':
      note = notelist.g4;
      active_key = 'g4';
      break;
    // A4
    case 'KeyJ':
      note = notelist.a4;
      active_key = 'a4';
      break;
    // B4
    case 'KeyK':
      note = notelist.b4;
      active_key = 'b4';
      break;

    // C5
    case 'KeyL':
      note = notelist.c5;
      active_key = 'c5';
      break;
    default:
      alert('Key has not been mapped yet');

  }

  switch (wave)
  {

    case 'sine':
      sustain = 0.3;
      break;
    case 'sine':
      sustain = 0.3;
      break;
    default:
      sustain = 0.5;
  }

  document.getElementById(active_key).style.backgroundColor = 'grey';
  setTimeout(function () {document.getElementById(active_key).style.backgroundColor = 'white';}, 500);

  const osci = audioCtx.createOscillator();
  osci.type = wave;
  osci.frequency.value = note;

  osci.connect(gainNode);
  
  gainNode.gain.setValueAtTime(0.33, audioCtx.currentTime);

  
  console.log('repeat: ' + repeat);

  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + sustain);
  osci.start();
  setTimeout(function () {osci.stop()}, 550);




}


// ----------------------------------------------------------------------------------

// Div of canvas
const container = document.getElementById('container');

// Drawing area
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// To get acsess to 2D library
const ctx = canvas.getContext('2d');

// ----------------------------------------------------------------------------------

let wave;
wave = 'square';

let sustain;

const waveForm = document.getElementById('waveForm');
waveForm.value = wave;
waveForm.onchange = function () {wave = waveForm.value};
console.log("now playing: " + wave);

const playDemo = document.getElementById('playDemo');
playDemo.addEventListener('click', function () {
  console.log('playing demo'); 
  demo.play();
  if (!demo.paused)
  {
    
  };


});

const notelist = {

  c3:130.81,
  d3:146.83,
  e3:164.81,
  f3:174.61,
  g3:196.00,
  a3:220.00,
  b3:246.94,

  c4:261.63,
  d4:293.66,
  e4:329.63,
  f4:349.23,
  g4:392.00,
  a4:440.00,
  b4:493.88,

  c5:523.25
};


// Main audio compenent
const audioCtx = new AudioContext();
const demo = new Audio('demo.mp3');
let audioSource = audioCtx.createMediaElementSource(demo);

// Gain for oscillator
let gainNode = audioCtx.createGain();

// Analyzer for drawing graph
let analyzer = audioCtx.createAnalyser();
gainNode.connect(analyzer);
audioSource.connect(analyzer);
analyzer.connect(audioCtx.destination);

// Half of fftSize, is the number  of bars to be drawn by vizulizer
analyzer.fftSize = 256;

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
      ctx.fillStyle = 'red';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 5;
  }
  requestAnimationFrame(animate);
}









