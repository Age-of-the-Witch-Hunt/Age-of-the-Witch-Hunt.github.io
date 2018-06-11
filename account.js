page = 1;

var signoutBtn = document.getElementById('signoutBtn');
signoutBtn.addEventListener('click', function() {
  signoutUser();
});

function signoutUser() {
  firebase.auth().signOut().then(function () {
    window.location.replace("https://age-of-the-witch-hunt.github.io/signin.html");
  }).catch(function (error) {
    console.log("ERRO: " + error.message);
  });
}

var createCharacterBtn = document.getElementById('createCharacterBtn');
createCharacterBtn.addEventListener('click', function(){
  window.location.replace("https://age-of-the-witch-hunt.github.io/customize.html");
});
