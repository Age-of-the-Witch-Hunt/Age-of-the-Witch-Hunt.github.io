// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7gWTmwld2aeayNE_X6AJZVzhpml1aA18",
  authDomain: "aotwh-629fa.firebaseapp.com",
  databaseURL: "https://aotwh-629fa.firebaseio.com",
  projectId: "aotwh-629fa",
  storageBucket: "aotwh-629fa.appspot.com",
  messagingSenderId: "562336702577"
};
firebase.initializeApp(config);
const rootRef = firebase.database().ref();
var page;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    switch(page) {
      case 1:
        getUserData();
        break;
      default:
        var userId = firebase.auth().currentUser.uid;
        console.log(userId);
    }
  } else {
    switch(page) {
      case 1:
        window.location.replace("signin.html");
        break;
    }
    //console.log("Usuário offline");
    //user = firebase.auth().currentUser;
    //console.log(user);
  }
});

function testProfile(user) {
  user = firebase.auth().currentUser;
  if (user === null) {
    location.href='register.html';
  } else {
    location.href='account.html';
  }
}

function registerUser() {
  var email = document.getElementById("userEmail").value;
  var password = document.getElementById("userPassword").value;
  var passwordConfirm = document.getElementById("userPasswordConfirm").value;

  if ((password === "") && (passwordConfirm === "")){
    alert("You must enter a password.");
  } else if (password != passwordConfirm) {
    alert("Passwords don't match.");
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
      writeUserData();
    })
    .catch(function (error) {
      alert("ERROR: " + error.message);
    });
  }
}

function writeUserData(userId, userEmail) {
  var name = document.getElementById("userName").value;
  userId = firebase.auth().currentUser.uid;

  firebase.database().ref('users/' + userId).set({
    username: name
  }).then(function () {
    window.location.replace("customize.html");
  })
  .catch(function (error) {
    alert("ERROR: " + error.message);
  });
}

function signinUser() {
  var email = document.getElementById("userEmail").value;
  var password = document.getElementById("userPassword").value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
    window.location.replace("account.html");
  })
  .catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert("Senha incorreta.");
    }
    if (errorCode === 'auth/invalid-email') {
      alert("E-mail inválido.");
    }
    if (errorCode === 'auth/user-not-found') {
      alert("Usuário não existe.");
    }
    if (errorCode === 'auth/user-disabled') {
      alert("Usuário não existe.");
    }
    console.log(error);
  });
}

function getUserData(user) {
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = snapshot.val().username;
    var userEmail = firebase.auth().currentUser.email;
    document.getElementById("username").innerHTML = "Welcome, " + username;
    document.getElementById("usernameData").innerHTML = username;
    document.getElementById("userEmailData").innerHTML = userEmail;
    document.getElementById("spinner").style.display = "none";
    document.getElementById("body").style.visibility = "visible";
  });
}
