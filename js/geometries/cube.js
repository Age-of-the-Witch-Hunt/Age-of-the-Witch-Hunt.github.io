var cube;

function addCube() {
	var cubeMat = new THREE.MeshStandardMaterial({
	  color: 0x800080,
	  roughness: 0.3,
	  metalness: 0.5
	});
	var cubeGeom = new THREE.CubeGeometry( 50, 50, 50 );
	//MovingCubeMat.visible = false;
	cube = new THREE.Mesh( cubeGeom, cubeMat );
	cube.position.set(0, 25.1, 0);
	scene.add( cube );
}

addCube();
