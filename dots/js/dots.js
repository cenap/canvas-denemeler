let canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d"), w, midX, h, particles = [], angle = 0;

const Tau = Math.PI * 2,  ConnectionDist = 100, maxParticles = 100, radius = 10,  Msqrt = Math.sqrt, Mrandom = Math.random;

function handleResize(){
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

	w = ctx.canvas.width ;
	h = ctx.canvas.height ;
	midX = w * .5;
  //console.log(w,h);
}

function createParticles() {
	let vRange = 1.5,
		vMin = .5,
		vx, vy;
	for (let i = 0; i < maxParticles; i++) {
		vx = Mrandom() * vRange + vMin;
		vy = Mrandom() * vRange + vMin;
		if(Mrandom() > .5){ vx *= -1; }
		if(Mrandom() > .5){ vy *= -1; }
		particles.push({
			x: Mrandom() * w - radius,
			y: Mrandom() * h - radius,
			xv: Mrandom() * vx,
			yv: Mrandom() * vy,
			strokeColour: {h:0, s:1}
		});
	}
}

function update() {
	let p;
	for (let loop = particles.length, i = 0; i < loop; i++) {
		p = particles[i];
		// move
		p.x += p.xv;
		p.y += p.yv;
		// keep in bounds
		if (p.x < 0) {
			p.x = 0;
			p.xv *= -1;
		}
		else if (p.x > w) {
			p.x = w;
			p.xv *= -1;
		}
		if (p.y < 0) {
			p.y = 0;
			p.yv *= -1;
		}
		else if (p.y > h) {
			p.y = h;
			p.yv *= -1;
		}
	}

  if (angle++ >= 360) {
    angle = 0;
  }

}

function connect(){
	let p1, p2;
	for (let i = 0; i < maxParticles-1; i++) {
		p1 = particles[i];
		for (let j = i + 1; j < maxParticles; j++) {
			p2 = particles[j];
			currentDist = getDistance(p2.x, p1.x, p2.y, p1.y);
			if (currentDist < ConnectionDist) {
				ctx.beginPath();
				ctx.moveTo(p1.x + (radius/2), p1.y + (radius/2) );
				ctx.strokeStyle = 'hsla(' + p1.hue + ', 50%, 50%, ' + (1 - currentDist * 0.01) + ')';
        ctx.lineWidth = 1;
				ctx.lineTo(p2.x + (radius/2), p2.y + (radius/2), p1.x + (radius/2), p1.y + (radius/2));
				ctx.stroke();
			}
		}
	}
}

function draw() {
	let p, d;
	for (let loop = particles.length, i = 0; i < loop; i++) {
		p = particles[i];
		d = getDistance(midX, p.x, h, p.y);
		p.hue = d;
		ctx.beginPath();
		ctx.fillStyle = 'hsla(' + d + ' , 50%, 30%, 1)';
		//ctx.arc(p.x, p.y, radius, 0, Tau);
    //ctx.strokeStyle = '#990000';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'hsla(' + p.hue + ', 50%, 50%, ' + 10 + ')';

    let centerx = p.x + radius/2;
    let centery = p.y + radius/2;
/*
    ctx.translate(centerx, centery);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-centerx, -centery);
*/
    ctx.strokeRect(p.x, p.y, radius, radius);
		ctx.fill();
	}
}

function getDistance(x1, x2, y1, y2) {
	let a = x1 - x2,
		b = y1 - y2;
	return Msqrt(a * a + b * b);
}

function animate() {
	canvas.width = w;
	update();
	connect();
	draw();
	requestAnimationFrame(animate);
}
