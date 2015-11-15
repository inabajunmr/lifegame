var context = new AudioContext();

function ring(elements, context){

	for(var vvv = 0; vvv < max; vvv++){
		for(var hhh = 0; hhh < max; hhh++){
			if(elements[vvv][hhh].checked){

				//音程はここで決まる

				var os = createOsillator(context, hhh * 100, vvv * 5);

				function vvvvv(os){

					os.start(0);
//					console.log(os.frequency.value);
					//ここは速度に依存
					window.setTimeout(function(value) {
					    value.stop(0);
					}, 300, os);
				}
				vvvvv(os);
			}
		}
	}
}

var volume = 50;
function changeVolume(value) {
	volume = value;
}


function createOsillator(context, frequency, detune){
	var oscillator = context.createOscillator();
	oscillator.type = (typeof oscillator.type === 'string') ? 'sine' : 0;
	oscillator.frequency.value = frequency;
	oscillator.detune.value = detune;

	var gain = context.createGain();
	gain.gain.value = 0.00;
//	gain.gain.setValueAtTime(0.25, context.currentTime);
	gain.gain.linearRampToValueAtTime(volume * 0.01, context.currentTime + 0.05);
//	gain.gain.exponentialRampToValueAtTime(0.00, context.currentTime + 1.00);
	gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.04);
//	gain.gain.value = parseInt(volume) * 0.01;

	oscillator.connect(gain);
	gain.connect(context.destination);

//	var compressor = context.createDynamicsCompressor();
//	oscillator.connect(compressor);
//	compressor.connect(context.destination);

	return oscillator;

}

// //TEST
// function createOsillator(context, frequency, detune, type){
// 	var oscillator = context.createOscillator();
// 	oscillator.type = type;
// 	oscillator.frequency.value = frequency;
// 	oscillator.detune.value = detune;

// 	var gain = context.createGain();
// 	gain.gain.setValueAtTime(0.25, context.currentTime);
// 	gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.65);


// 	oscillator.connect(gain);
// 	gain.connect(context.destination);

// //	var compressor = context.createDynamicsCompressor();
// //	oscillator.connect(compressor);
// //	compressor.connect(context.destination);

// 	return oscillator;

// }



function soundTest(){
var AudioContext = window.AudioContext || window.webkitAudioContext,
ctx = new AudioContext();
var oscillator = ctx.createOscillator();
var gainNode = ctx.createGain();
oscillator.type = 'sawtooth'; // 音の波形
oscillator.detune.value = 0; // 音の高さとか調整？
oscillator.frequency.value = 880; // 周波数 880Hz
gainNode.gain.value = 0.59; // 音量

oscillator.connect(gainNode);
gainNode.connect(ctx.destination);

oscillator.start();	
}
