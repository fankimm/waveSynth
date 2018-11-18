var osc1
var osc2
var osc3
var osc4

var osc1amp
var osc2amp
var osc3amp
var osc4amp

var fft

var oct
var isPlaying
var freq
var keyIndex
var pentaTable
function setup() {
  createCanvas(500,500)


  pentaTable = [440.0, 523.2511, 587.3295, 622.2540, 659.2551, 783.9909]
  oct = 0
  keyIndex = 0
  freq = 440
  isPlaying = false
  osc1amp = 0.0
  osc2amp = 0.0
  osc3amp = 0.0
  osc4amp = 0.0

  osc1 = new p5.Oscillator()
  osc2 = new p5.Oscillator()
  osc3 = new p5.Oscillator()
  osc4 = new p5.Oscillator()
  fft = new p5.FFT()
  osc1.setType('sine')
  osc2.setType('sawtooth')
  osc3.setType('square')
  osc4.setType('triangle')
  osc1.freq(freq)
  osc2.freq(freq)
  osc1.amp(0)
  osc2.amp(0)
  osc3.amp(0)
  osc4.amp(0)

  osc1.start()
  osc2.start()
  osc3.start()
  osc4.start()


}

function draw() {
  playFreq()
background(255)
  text("oct : " + oct, 10, 10)
  text(keyIndex, 50, 10)
  text("Hz : " + pentaTable[keyIndex] * pow(2, oct), 10, 20)
  text("sine : " + int(osc1amp * 10), 10, height - 30)
  text("sawtooth : " + int(osc2amp * 10), width / 4, height - 30)
  text("pulse : " + int(osc3amp * 10), width / 2, height - 30)
  text("triangle : " + int(osc4amp * 10), width / 4 * 3, height - 30)
  var waveform = fft.waveform()

  beginShape()
  strokeWeight(2)
  for (var i = 0; i < waveform.length; i++){
    var x = map(i * 5, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 2, height/10 * 8, 0);
    vertex(x, y);
  }
  endShape();
}

function keyPressed(){
  console.log(keyCode)

  switch(keyCode){
    case 32:
      if(!isPlaying){
        osc1.amp(osc1amp, 0.05)
        osc2.amp(osc2amp, 0.05)
        osc3.amp(osc3amp, 0.05)
        osc4.amp(osc4amp, 0.05)
        isPlaying = true
        osc1.start()
        osc2.start()
        osc3.start()
        osc4.start()
      } else if(isPlaying){
      osc1.stop()
      osc2.stop()
      osc3.stop()
      osc4.stop()

      isPlaying = false
    }
    break

    case 38:
      keyIndex ++
      playFreq()
      break
    case 40:
      keyIndex --
      playFreq()
      break
      case 49:
      osc1amp += 0.1

      break
      case 50:
      osc2amp += 0.1

      break
      case 51:
      osc3amp += 0.1

      break
      case 52:
      osc4amp += 0.1

      break

      case 81:
      osc1amp -= 0.1

      break
      case 87:
      osc2amp -= 0.1

      break
      case 69:
      osc3amp -= 0.1

      break
      case 82:
      osc4amp -= 0.1

      break
    default:
      break


  }
}

function playFreq(){
  if(keyIndex > 5){
    keyIndex = 0
    oct ++
  } else if(keyIndex < 0){
    keyIndex = 5
    oct --
  }
  if(osc1amp <0) osc1amp = 0
  else if(osc1amp > 1) osc1amp = 1
  else if(osc2amp < 0) osc2amp = 0
  else if(osc2amp > 1) osc2amp = 1
  else if(osc3amp < 0) osc3amp = 0
  else if(osc3amp > 1) osc3amp = 1
  else if(osc4amp < 0) osc4amp = 0
  else if(osc4amp > 1) osc4amp = 1

  osc1.amp(osc1amp, 0.05)
  osc2.amp(osc2amp, 0.05)
  osc3.amp(osc3amp, 0.05)
  osc4.amp(osc4amp, 0.05)
  osc1.freq(pentaTable[keyIndex] * pow(2, oct))
  osc2.freq(pentaTable[keyIndex] * pow(2, oct))
  osc3.freq(pentaTable[keyIndex] * pow(2, oct))
  osc4.freq(pentaTable[keyIndex] * pow(2, oct))
}

function mouseMoved(){
  oct = int(map(height - mouseY, 0 , height, 0 , 25) / 6)
  keyIndex = int(map(height - mouseY, 0 , height, 0 , 25) % 6)
  playFreq()
}

function oscPlay(){
  osc1.stop()
  osc2.stop()
  osc3.stop()
  osc4.stop()
  for (var i = 0; i < 4; i++){
    ("osc" + i).stop()
  }
}
