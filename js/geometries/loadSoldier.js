var soldier, soldierHair, mixerSoldier;
var loader = new THREE.ObjectLoader();
var action = {};
var soldierActiveActionName = 'soldieridle';
var soldierArrAnimations = [ 'soldieridle' ];
var soldierActualAnimation = 0;

//SKIN COLOR
var soldierSkinColors = [0xFEE3C5, 0xF9D4A0, 0xECC091, 0xF2C280, 0xBB6536, 0xCF965F, 0xAD8A60, 0x935F37, 0x733F17, 0xB26644, 0x7F4422, 0x5F3310, 0x291709 ];
var soldierSkinColorNum = 0;
var nextSoldierSkinColor = document.getElementById('nextSoldierSkinColor');
nextSoldierSkinColor.addEventListener('click', function() {
  if (soldierSkinColorNum < soldierSkinColors.length - 1) {
    soldierSkinColorNum +=1;
    soldier.material.color = new THREE.Color(soldierSkinColors[soldierSkinColorNum]);
  } else {
    soldierSkinColorNum = 0;
    soldier.material.color = new THREE.Color(soldierSkinColors[soldierSkinColorNum]);
  }
});
var prevSoldierSkinColor = document.getElementById('previousSoldierSkinColor');
prevSoldierSkinColor.addEventListener('click', function() {
  if (soldierSkinColorNum > 0) {
    soldierSkinColorNum -=1;
    soldier.material.color = new THREE.Color(soldierSkinColors[soldierSkinColorNum]);
  } else {
    soldierSkinColorNum = skinColors.length - 1;
    soldier.material.color = new THREE.Color(soldierSkinColors[soldierSkinColorNum]);
  }
});

//HAIR COLOR
var soldierHairColors = [ 0xDC3E1B, 0xEC7C2A, 0x702A22, 0xECCC91, 0xFFDFB0, 0xFFDFB0, 0xD2A154, 0x994425, 0x946645, 0x352118 ];
var soldierHairColorNum = 0;
var nextSoldierHairColor = document.getElementById('nextSoldierHairColor');
nextSoldierHairColor.addEventListener('click', function() {
  if (soldierHairColorNum < soldierHairColors.length - 1) {
    soldierHairColorNum +=1;
    soldierHair.material.color = new THREE.Color(soldierHairColors[soldierHairColorNum]);
  } else {
    soldierHairColorNum = 0;
    soldierHair.material.color = new THREE.Color(soldierHairColors[soldierHairColorNum]);
  }
});
var prevSoldierHairColor = document.getElementById('previousSoldierHairColor');
prevSoldierHairColor.addEventListener('click', function() {
  if (soldierHairColorNum > 0) {
    soldierHairColorNum -=1;
    soldierHair.material.color = new THREE.Color(soldierHairColors[soldierHairColorNum]);
  } else {
    soldierHairColorNum = soldierHairColors.length - 1;
    soldierHair.material.color = new THREE.Color(soldierHairColors[soldierHairColorNum]);
  }
});

//BODY TYPE
var soldierInfluence0, soldierInfluence1, soldierBodyStyleNum = 0;
function soldierBody0(){
  soldierInfluence0 = 0;
  soldierInfluence1 = 0;
}
function soldierBody1(){
  soldierInfluence0 = 0;
  soldierInfluence1 = 1;
}
function soldierBody2(){
  soldierInfluence0 = 1;
  soldierInfluence1 = 0;
}
function soldierBody3(){
  soldierInfluence0 = 1;
  soldierInfluence1 = 1;
}
var soldierBodyStyles = [soldierBody0, soldierBody1, soldierBody2, soldierBody3];
var nextSoldierBody = document.getElementById('nextSoldierBody');
nextSoldierBody.addEventListener('click', function() {
  if (soldierBodyStyleNum < soldierBodyStyles.length - 1) {
    soldierBodyStyleNum +=1;
    soldierBodyStyles[soldierBodyStyleNum]();
  } else {
    soldierBodyStyleNum = 0;
    soldierBodyStyles[soldierBodyStyleNum]();
  }
});
var prevSoldierBody = document.getElementById('previousSoldierBody');
prevSoldierBody.addEventListener('click', function() {
  if (soldierBodyStyleNum > 0) {
    soldierBodyStyleNum -=1;
    soldierBodyStyles[soldierBodyStyleNum]();
  } else {
    soldierBodyStyleNum = soldierBodyStyles.length - 1;
    soldierBodyStyles[soldierBodyStyleNum]();
  }
});

//HAIRS
var soldierHairStyles = [soldierHair0];
var soldierHairNum = 0;

function soldierHair0() {
  loader.load("https://gist.githubusercontent.com/FilipeNowickiG/d06b1656bbb8d492c42dddd94525ff13/raw/5e5fcaa3a6cef1c4bbf8f7b52b2ba54b8988031e/hair00.json", function ( loadedObject  ) {
  loadedObject.traverse( function ( child ) { if ( child instanceof THREE.SkinnedMesh ) { soldierHair00 = child; } } );
  
  soldierHair00.material.color = new THREE.Color(soldierHairColors[soldierHairColorNum]);
  
  soldierHair = soldierHair00;

  soldier.skeleton.bones[4].add(soldierHair00);
  soldierHair00.rotation.x = -90 * Math.PI / 180;
  soldierHair00.position.z = -0.3;
  soldierHair00.position.y = 0.1;
  });
}

//TURN LEFT AND RIGHT
var tSoldierRight, tSoldierLeft;

var turnSoldierLeft = document.getElementById('turnSoldierLeft');
var turnSoldierRight = document.getElementById('turnSoldierRight');

turnSoldierRight.onmousedown = function() {tSoldierRight = true};
turnSoldierRight.onmouseup = function() {tSoldierRight = false};

turnSoldierLeft.onmousedown = function() {tSoldierLeft = true};
turnSoldierLeft.onmouseup = function() {tSoldierLeft = false};

function rotateSoldier(){
  if (tSoldierRight === true) {
		soldier.rotation.y += 0.05;
		//Background.rotation.x += 0.01;
	}
	if (tSoldierLeft === true) {
		soldier.rotation.y -= 0.05;
		//Background.rotation.x -= 0.01;
	}
}

updateFunctions.push(function(delta){
  rotateSoldier();
});

//CREATE ANIMATION MIXER
function createMixer(){
  mixerSoldier = new THREE.AnimationMixer( soldier );
  action.idle = mixerSoldier.clipAction(soldier.geometry.animations[ 0 ]);
  action.idle.setEffectiveWeight(1);
  action.idle.enabled = true;
  
  updateFunctions.push(function(delta) {
    mixerSoldier.update(delta);
  });
  
  action.idle.play();
}

function createMorphs(){
  soldier.geometry.computeMorphNormals();

  updateFunctions.push(function updateSoldierInfluence(delta) {
    soldier.morphTargetInfluences[0] = soldierInfluence0;
    soldier.morphTargetInfluences[1] = soldierInfluence1;
  });
}

//LOAD THE SOLDIER BASE
loader.load("https://gist.githubusercontent.com/FilipeNowickiG/1267edd804eb4174ccf7442011001cba/raw/3842cf1ef9327ce0910ac87022feb1b46068ffef/RigMaleBody.json", function ( loadedObject  ) {
  loadedObject.traverse( function ( child ) { if ( child instanceof THREE.SkinnedMesh ) { soldier = child; } } );
  
  soldier.material.color = new THREE.Color(soldierSkinColors[soldierSkinColorNum]);
  soldier.material.morphTargets = true;
  soldier.material.morphNormals = true;
  
  scene.add(soldier);
  soldier.position.x = 50;
  
  soldierHairStyles[soldierHairNum]();
  
  createMorphs();
  createMixer();
});