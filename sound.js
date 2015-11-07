var context = new AudioContext();

function ring(elements, context){

	for(var vvv = 0; vvv < max; vvv++){
		for(var hhh = 0; hhh < max; hhh++){
			if(elements[vvv][hhh].checked){

				//音程はここで決まる
				var os = createOsillator(context, hhh * vvv * 10);
				function vvvvv(os){

					os.start(0);
					console.log(os.frequency.value);
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

function createOsillator(context, frequency){
	var oscillator = context.createOscillator();
	oscillator.type = (typeof oscillator.type === 'string') ? 'sine' : 0;
	oscillator.frequency.value = frequency;

	var gain = context.createGain();
	gain.gain.setValueAtTime(0.25, context.currentTime);
	gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.65);


	oscillator.connect(gain);
	gain.connect(context.destination);

//	var compressor = context.createDynamicsCompressor();
//	oscillator.connect(compressor);
//	compressor.connect(context.destination);

	return oscillator;

}
