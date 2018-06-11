var floor;

function addFloor() {
  var floorMaterial = new THREE.MeshLambertMaterial({
    color: 0x0000ff
  });
	var floorGeometry = new THREE.PlaneGeometry(7000, 7000, 100, 100);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = -90 * Math.PI / 180;
	scene.add(floor);
	
	//targetList.push(floor);
}

addFloor();