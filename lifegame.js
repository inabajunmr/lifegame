var max = 5;

function execute(){
	loop(1, 1);
}

function loop(i, j){

	var radioId = i + "_" + j;
	checkRadio(radioId);

	j = j + 1;
	if(j == max + 1){
		i = i + 1;
		j = 1;
	}

	if(i == max + 1){
		i = 1;
	}

	setTimeout("loop(" + i + "," + j + ")", 100);
}

function checkRadio(id){
	document.getElementById(id).checked = !document.getElementById(id).checked;			

}