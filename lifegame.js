var max = 5;
var speed = 100;
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

//lifegame
function loop2(){
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


	setTimeout("loop2()", speed);
}

function checkRadio(id){
	document.getElementById(id).checked = !document.getElementById(id).checked;			
}

function reset(){
	run = false;
	init();
}

