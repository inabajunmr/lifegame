var max = 15;
var speed = 250;
var run = false;

function init(){

	var areaHTML = "";
	for(var h = 0; h < max; h++){
		for(var v = 0; v < max; v++){
			var id = h + "_" + v;
			areaHTML = areaHTML + "<input type='radio' id='" + id + "'>"	

		}

		areaHTML = areaHTML + "<br/>"	
	}

	document.getElementById("area").innerHTML = areaHTML;


}

function execute(){
	run = true;
	loop(0, 0);
}

//test
function loop(i, j){
	if(!run){
		return;
	}

	var radioId = i + "_" + j;
	checkRadio(radioId);

	j = j + 1;
	if(j == max){
		i = i + 1;
		j = 0;
	}

	if(i == max){
		i = 0;
	}

	setTimeout("loop(" + i + "," + j + ")", speed);
}


var context = new AudioContext();
function execute2(){
	//2重配列にラジオボタンを全部入れる
	var elements = [];

	for(var h = 0; h < max; h++){
		var row = [];
		for(var v = 0; v < max; v++){
			var id = h + "_" + v;
			row[v] = document.getElementById(id);
		}
		elements[h] = row;
	}


	run = true;

	loop2(elements, context);
}

//var test = 0;

//lifegame
function loop2(elements, context){
//	console.log("count:" + test++);
//	console.log(elements);

	if(!run){
		return;
	}


	//最初に全エレメントが入ってる２重配列作る　・・・　A
	//次にどうなるか用の２重配列作る　・・・　B
	//Bを組み立てる
	// 1. Aを１マス見る
	// 2. 隣接してるやつみる
	// 3. 生き死にをBに入力
	// 4. 1に戻る
	//全マス見たらBを一周しながらAのON、OFFをきりかえる
	//これを繰り返し
	//音出す
	ring(elements, context);

	//生死（生きてればture, 死んでればfalse）
	var sperms = [];

	//全部見て何するかはコールバックみたいにできんのかな・・？//TODO
	for(var v = 0; v < max; v++){
		var spermRow = [];
		for(var h = 0; h < max; h++){
			//対象セル周りの生死をカウント
			var count = sumAdjacentLiveCell(elements, v, h);
//			console.log(v + "_" + h + ":" + count);
			if(count == 3){
				//生存
				spermRow.push(true);
			}else if(count == 2){
				//現存維持
				spermRow.push(elements[v][h].checked);
			}else{	
				//死滅
				spermRow.push(false);
			}
		}
		sperms.push(spermRow);
	}

	redraw(elements, sperms);

	setTimeout( function(value, value2){
		loop2(value, value2);
	},speed, elements,context);
}

//生死に合わせて画面を再描画する
function redraw(elements, sperms){
	for(var v = 0; v < max; v++){
		for(var h = 0; h < max; h++){
			elements[v][h].checked = sperms[v][h];
		}
	}
}

//隣接するセルで生きているセルをカウントして返却する
function sumAdjacentLiveCell(elements, v, h){
	//v=行数 h=列数

	var minv = v == 0; //上にはみだす
	var minh = h == 0; //左にはみだす
	var maxv = v == max - 1; //下にはみだす
	var maxh = h == max - 1; //右にはみだす


	var cells = [];
	if(!minv && !minh) cells.push([v-1,h-1]);//左上
	if(!minv) cells.push([v-1,h]);  //真上
	if(!minv && !maxh) cells.push([v-1,h+1]);//右上

	if(!minh) cells.push([v,h-1]); //左
	if(!maxh) cells.push([v,h+1]); //右

	if(!maxv && !minh) cells.push([v+1,h-1]);//左下
	if(!maxv) cells.push([v+1,h]);  //真下
	if(!maxv && !maxh) cells.push([v+1,h+1]);//右下

	var count = 0;
	for(var i = 0; i < cells.length; i++){
		if (elements[cells[i][0]][cells[i][1]].checked) count = count + 1;
	}
	return count;
}

function checkRadio(id){
	document.getElementById(id).checked = !document.getElementById(id).checked;			
}

function reset(){
	run = false;
	init();
}

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


	return oscillator;

}
