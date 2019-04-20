const config = require("../config/config");

let actionCodeSettings = config.actionCodeSettings;

var firebase = require("firebase");

module.exports.signin = function (email,password) {
  return new Promise((resolve, reject) => {
    try{
      if (firebase.auth().currentUser) {
           // [START signout]
           return firebase.auth().signOut();
           // [END signout]
         } else {
           firebase.auth().signInWithEmailAndPassword(email, password)
           .then(() => {
             console.log(email + " is signed in");
             resolve();})
           .catch(function(error) {
             // Handle Errors here.
             var errorCode = error.code;
             var errorMessage = error.message;
             // [START_EXCLUDE]
             if (errorCode === 'auth/wrong-password') {
               console.log('Wrong password.');
             } else {
               console.log(errorMessage);
             }
             console.log(error);
             reject(error);
             // [END_EXCLUDE]
           });
           // [END authwithemail]
         }
       }catch(err) {
           reject(err);
       }
  });
}

module.exports.signout = function () {
  return new Promise((resolve, reject) => {
    try{
      if (firebase.auth.currentUser){
        var user = firebase.auth().currentUser;
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          console.log( user.email + " signed out. ")
          resolve();
        }).catch(function(error) {
          console.log(error.message);
          reject(error);
        });
      }
      else{
        let error = {
          code: "auth/already-logged-out",
          message : "nobody is logged in",
        }
        reject(error);
      }
    }catch(err) {
        reject(err);
    }
  });
}

module.exports.signup = function (email,password) {
  return new Promise((resolve, reject) => {
    try{
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { resolve(); })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          console.log('The password is too weak.');
        } else {
          console.log(errorMessage);
        }
        console.log(error);
        reject(error);
        // [END_EXCLUDE]
      });
    }catch(err) {
        reject(err);
    }
  });
}

module.exports.sendLinkEmail = function () {
  return new Promise((resolve, reject) => {
    try{
      if (firebase.auth().currentUser.emailVerified == false){
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          // Email Verification sent!
          // [START_EXCLUDE]
          console.log('Email Verification Sent!');
          resolve();
          // [END_EXCLUDE]
        })
        .catch(function(error) {
          reject(error);
        });
      }
      else{
        let error = {
          code: "auth/mail-already-verified",
          message : "email " + firebase.auth().currentUser.email +" is already verified",
        }
        reject(error);
      }
    }catch(err) {
        reject(err);
    }
  });
}

module.exports.updatepwd = function (newpwd) {
  return new Promise((resolve, reject) => {
    try{
      var user = firebase.auth().currentUser;

      user.updatePassword(newpwd).then(function() {
      // Update successful.
        console.log( user.email + " password updated")
        resolve();
      }).catch(function(error) {
        console.log(error.message);
        reject(error);
      });
    }catch(err) {
        reject(err);
    }
  });
}

module.exports.deleteUser = function () {
  return new Promise((resolve, reject) => {
    try{
      var user = firebase.auth().currentUser;

      user.delete().then(function() {
        console.log( user.email + " is now deleted ")
        resolve();
      }).catch(function(error) {
        // An error happened.
        console.log(error.message);
        reject(error);
      });
    }catch(err) {
        reject(err);
    }
  });
}


module.exports.initfire = function() {

  // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        // [END_EXCLUDE]
        if (user) {
          // User is signed in.
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
    }
