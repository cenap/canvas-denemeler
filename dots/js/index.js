$( document ).ready(function() {
	window.onresize = () => handleResize();
	handleResize();
	createParticles();
	animate();
});
