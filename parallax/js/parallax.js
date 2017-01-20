var canvas,context,bg01,dx01=0,dx02=0,dx03=0, dx04=0;
$( document ).ready(function() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    bg01 = new Image();
    bg01.src = 'img/mountains.png';
    bg02 = new Image();
    bg02.src = 'img/bg01.png';
    bg03 = new Image();
    bg03.src = 'img/bg02.png';


	window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            /**
             * Your drawings need to be inside this function otherwise they will be reset when
             * you resize the browser window and the canvas goes will be cleared.
             */
            //drawStuff();
    }
    resizeCanvas();

	requestAnimationFrame(heartBeat);

	bg01.onload = function() {
		console.log(bg01.naturalWidth,bg01.naturalHeight);
		console.log(bg02.naturalWidth,bg02.naturalHeight);
		console.log(canvas.width, canvas.height);
    };

});

function heartBeat() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#000000";
	//context.fillRect(0,0,canvas.width, canvas.height);

	var height=canvas.height;

	var width = bg01.width*canvas.height/bg01.height/2;
	drawImage(bg01, dx01, 0, width, height);
	dx01-=.1;
	if (dx01<-width) {dx01=0;}


	width = bg02.width*(canvas.height/bg02.height)/2;
	drawImage(bg02, dx02, 0, width, height);
	dx02-=.3;
	if (dx02<-width) {dx02=0;}

	width = bg03.width*(canvas.height/bg03.height)/2;
	drawImage(bg03, dx03, 0, width, height);
	dx03-=.6;
	if (dx03<-width) {dx03=0;}

	//drawObjects();

    requestAnimationFrame(heartBeat);
}

function drawImage(img,x,y, w, h) {
	context.drawImage(img, x, y, w, h);
	var notFilled = (x+w)<canvas.width, i=0;
	while(notFilled){
		var rightEnd = x+i*w;
		if (rightEnd<canvas.width) {
			i++;
			context.drawImage(img, x+(i*w), y, w, h);
			//context.rect(x+(i*w), y, w, h);
			//context.stroke();
		} else {
			notFilled = false;
		}

	}
}


function drawObjects() {
	drawCircle(dx04,100,20);
	dx04-=0.3;
	if (dx04<-40) {dx04=0;}
}

function drawCircle(x,y,r) {
	context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.fillStyle = '#6699FF';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003366';
    context.stroke();
}
