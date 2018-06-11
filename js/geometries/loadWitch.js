var witch, witchHair, mixerWitch;
var loader = new THREE.ObjectLoader();
var action = {};
var witchActiveActionName = 'witchidle';
var witchArrAnimations = [ 'witchidle' ];
var witchActualAnimation = 0;

//SKIN COLOR
var witchSkinColors = [0xFEE3C5, 0xF9D4A0, 0xECC091, 0xF2C280, 0xBB6536, 0xCF965F, 0xAD8A60, 0x935F37, 0x733F17, 0xB26644, 0x7F4422, 0x5F3310, 0x291709 ];
var witchSkinColorNum = 0;
var nextWitchSkinColor = document.getElementById('nextWitchSkinColor');
nextWitchSkinColor.addEventListener('click', function() {
  if (witchSkinColorNum < witchSkinColors.length - 1) {
    witchSkinColorNum +=1;
    witch.material.color = new THREE.Color(witchSkinColors[witchSkinColorNum]);
  } else {
    witchSkinColorNum = 0;
    witch.material.color = new THREE.Color(witchSkinColors[witchSkinColorNum]);
  }
});
var prevWitchSkinColor = document.getElementById('previousWitchSkinColor');
prevWitchSkinColor.addEventListener('click', function() {
  if (witchSkinColorNum > 0) {
    witchSkinColorNum -=1;
    witch.material.color = new THREE.Color(witchSkinColors[witchSkinColorNum]);
  } else {
    witchSkinColorNum = skinColors.length - 1;
    witch.material.color = new THREE.Color(witchSkinColors[witchSkinColorNum]);
  }
});

//HAIR COLOR
var witchHairColors = [ 0xDC3E1B, 0xEC7C2A, 0x702A22, 0xECCC91, 0xFFDFB0, 0xFFDFB0, 0xD2A154, 0x994425, 0x946645, 0x352118 ];
var witchHairColorNum = 0;
var nextWitchHairColor = document.getElementById('nextWitchHairColor');
nextWitchHairColor.addEventListener('click', function() {
  if (witchHairColorNum < witchHairColors.length - 1) {
    witchHairColorNum +=1;
    witchHair.material.color = new THREE.Color(witchHairColors[witchHairColorNum]);
  } else {
    witchHairColorNum = 0;
    witchHair.material.color = new THREE.Color(witchHairColors[witchHairColorNum]);
  }
});
var prevWitchHairColor = document.getElementById('previousWitchHairColor');
prevWitchHairColor.addEventListener('click', function() {
  if (witchHairColorNum > 0) {
    witchHairColorNum -=1;
    witchHair.material.color = new THREE.Color(witchHairColors[witchHairColorNum]);
  } else {
    witchHairColorNum = wicthHairColors.length - 1;
    witchHair.material.color = new THREE.Color(witchHairColors[witchHairColorNum]);
  }
});

//BODY TYPE
var witchInfluence0, witchInfluence1, witchBodyStyleNum = 0;
function witchBody0(){
  witchInfluence0 = 0;
  witchInfluence1 = 0;
}
function witchBody1(){
  witchInfluence0 = 0;
  witchInfluence1 = 1;
}
function witchBody2(){
  witchInfluence0 = 1;
  witchInfluence1 = 0;
}
function witchBody3(){
  witchInfluence0 = 1;
  witchInfluence1 = 1;
}
var witchBodyStyles = [witchBody0, witchBody1, witchBody2, witchBody3];
var nextWitchBody = document.getElementById('nextWitchBody');
nextWitchBody.addEventListener('click', function() {
  if (witchBodyStyleNum < witchBodyStyles.length - 1) {
    witchBodyStyleNum +=1;
    witchBodyStyles[witchBodyStyleNum]();
  } else {
    witchBodyStyleNum = 0;
    witchBodyStyles[witchBodyStyleNum]();
  }
});
var prevWitchBody = document.getElementById('previousWitchBody');
prevWitchBody.addEventListener('click', function() {
  if (witchBodyStyleNum > 0) {
    witchBodyStyleNum -=1;
    witchBodyStyles[witchBodyStyleNum]();
  } else {
    witchBodyStyleNum = witchBodyStyles.length - 1;
    witchBodyStyles[witchBodyStyleNum]();
  }
});

//HAIRS
var witchHairStyles = [witchHair0];
var witchHairNum = 0;

function witchHair0() {
  loader.load("https://gist.githubusercontent.com/FilipeNowickiG/d06b1656bbb8d492c42dddd94525ff13/raw/5e5fcaa3a6cef1c4bbf8f7b52b2ba54b8988031e/hair00.json", function ( loadedObject  ) {
  loadedObject.traverse( function ( child ) { if ( child instanceof THREE.SkinnedMesh ) { witchHair00 = child; } } );
  
  witchHair00.material.color = new THREE.Color(witchHairColors[witchHairColorNum]);
  
  witchHair = witchHair00;

  witch.skeleton.bones[3].add(witchHair00);
  witchHair00.rotation.x = -90 * Math.PI / 180;
  witchHair00.position.z = -0.3;
  witchHair00.position.y = 0.1;
  });
}

//TURN LEFT AND RIGHT
var tWitchRight, tWitchLeft;

var turnWitchLeft = document.getElementById('turnWitchLeft');
var turnWitchRight = document.getElementById('turnWitchRight');

turnWitchRight.onmousedown = function() {tWitchRight = true};
turnWitchRight.onmouseup = function() {tWitchRight = false};

turnWitchLeft.onmousedown = function() {tWitchLeft = true};
turnWitchLeft.onmouseup = function() {tWitchLeft = false};

function rotateWitch(){
  if (tWitchRight === true) {
		witch.rotation.y += 0.05;
		//Background.rotation.x += 0.01;
	}
	if (tWitchLeft === true) {
		witch.rotation.y -= 0.05;
		//Background.rotation.x -= 0.01;
	}
}

updateFunctions.push(function(delta){
  rotateWitch();
});

//LOAD THE WITCH BASE
loader.load("https://gist.githubusercontent.com/FilipeNowickiG/2e581f1f4ea80104b8d1278293d56a93/raw/1156a84d31b74a9a92dd7a91023d431a17a66b4e/RigFemaleBody.json", function ( loadedObject  ) {
  loadedObject.traverse( function ( child ) { if ( child instanceof THREE.SkinnedMesh ) { witch = child; } } );
  
  mixerWitch = new THREE.AnimationMixer( witch );
  action.idle = mixerWitch.clipAction(witch.geometry.animations[ 0 ]);

  action.idle.setEffectiveWeight(1);
  action.idle.enabled = true;

  witch.material.color = new THREE.Color(witchSkinColors[witchSkinColorNum]);
  witch.material.morphTargets = true;
  witch.material.morphNormals = true;
  
  witch.geometry.computeMorphNormals();
  function updateWitchInfluence() {
    witch.morphTargetInfluences[0] = witchInfluence0;
    witch.morphTargetInfluences[1] = witchInfluence1;
  }
  
  scene.add(witch);
  witch.position.x = -50;
  
  witchHairStyles[witchHairNum]();

  updateFunctions.push(function(delta) {
    mixerWitch.update(delta);
    updateWitchInfluence();
  });

  action.idle.play();
});