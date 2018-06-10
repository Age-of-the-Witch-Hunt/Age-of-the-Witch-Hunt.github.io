//VARIABLES
var scene, camera, renderer, controls, delta;
var clock = new THREE.Clock();
var updateFunctions = [];
var lastTimeMsec= null;

//HTML & CSS VARIABLES
var gRight, gLeft, bRight, bLeft = false;

init();


function init() {
  //SCENE
	scene = new THREE.Scene();
	
	//RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild( renderer.domElement );
	renderer.setPixelRatio( window.devicePixelRatio );
	
	//CAMERA
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0,5, 20);
	//controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function translateCamera() {
	if (gRight === true) {goRight()}
	if (bRight === true) {backRight()}
	if (gLeft === true) {goLeft()}
	if (bLeft === true) {backLeft()}
}

updateFunctions.push(function(delta){
  translateCamera();
});

//ANIMATION LOOP
updateFunctions.push(function(){
	renderer.render( scene, camera );
});

requestAnimationFrame(function animate(nowMsec){
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
	lastTimeMsec	= nowMsec;
	// call each update function
	updateFunctions.forEach(function(updateFunctions){
		updateFunctions(deltaMsec/1000, nowMsec/1000);
	});
});

//HTML & CSS FUNCTIONS
function goRight() {
	document.getElementById('mainScreen').style.marginLeft = "-100%";
	document.getElementById('soldierCustomization').style.marginLeft = "0";
	document.getElementById('soldierCustomization').style.marginRight = "0";
	gRight = true;
	if (camera.position.x < 45) {
		camera.translateX(0.3);
	} else {
		gRight = false;
	}
}

function goLeft() {
	document.getElementById('mainScreen').style.marginLeft = "100%";
	document.getElementById('witchCustomization').style.marginLeft = "0";
	document.getElementById('witchCustomization').style.margiRight = "0";
	gLeft = true;
	if (camera.position.x > -45) {
		camera.translateX(-0.3);
	} else {
		gLeft = false;
	}
}

function backRight() {
	document.getElementById('mainScreen').style.marginLeft = "0";
	document.getElementById('soldierCustomization').style.marginLeft = "100%";
	bRight = true;
	if (camera.position.x > 0) {
		camera.translateX(-0.3);
	} else {
		bRight = false;
	}
}

function backLeft() {
	document.getElementById('mainScreen').style.marginLeft = "0";
	document.getElementById('witchCustomization').style.marginLeft = "-100%";
	document.getElementById('witchCustomization').style.margiRight = "100%";
	bLeft = true;
	if (camera.position.x < 0) {
		camera.translateX(0.3);
	} else {
		bLeft = false;
	}
}
