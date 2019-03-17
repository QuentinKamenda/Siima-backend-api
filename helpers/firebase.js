const config = require("../config/config");

let actionCodeSettings = config.actionCodeSettings;

var firebase = require("firebase");

module.exports.signin = function (email,password) {
  if (firebase.auth().currentUser) {
       // [START signout]
       firebase.auth().signOut();
       // [END signout]
     } else {
       if (email.length < 4) {
         console.log('Please enter an email address.');
         return;
       }
       if (password.length < 4) {
         console.log('Please enter a password.');
         return;
       }
       // Sign in with email and pass.
       // [START authwithemail]
       firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
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
         // [END_EXCLUDE]
       });
       // [END authwithemail]
     }
}

module.exports.signup = function (email,password) {
      if (email.length < 4) {
        console.log('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        console.log('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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
        // [END_EXCLUDE]
      });
}

module.exports.sendLinkEmail = function () {
  // [START sendemailverification]
  console.log(firebase.auth().currentUser.emailVerified)
  if (firebase.auth().currentUser.emailVerified == false){
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      console.log('Email Verification Sent!');
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
  }
  else{
    console.log("email is verified");
    console.log(firebase.auth().currentUser.email);
  }

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