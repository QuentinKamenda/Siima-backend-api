const config = require("../config/config");

let actionCodeSettings = config.actionCodeSettings;

var firebase = require("firebase");
var jwt = require('jsonwebtoken');

const MongoUser = require("../models/user/user");

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
             MongoUser.findOne({mail: email}).then( result => {
              if (result == null){
                    console.log("pas trouvé")
                }
                else {
                  resolve(result);
                }
             })
           })
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

module.exports.generateJwt = function(userInformation) {
  return new Promise((resolve, reject) => {
    try{
      var expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);

      resolve(jwt.sign({
        _id: userInformation._id,
        email: userInformation.mail,
        name: userInformation.username,
        exp: parseInt(expiry.getTime() / 1000),
      }, "SIIMA")); // DO NOT KEEP YOUR SECRET IN THE CODE
    }catch(err) {
        reject(err);
    }
  });
};

module.exports.signout = function (userId) {
  console.log("logged_out" + userId);
  return new Promise((resolve, reject) => {
    try{
      if (firebase.auth().currentUser){
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

module.exports.getUser = function(_id) {
  MongoUser
    .findById(_id)
    .exec(function(err, user) {
      return user;
    });
}

module.exports.handleUnauthorizedError = function(req,res) {
  return new Promise((resolve, reject) => {
    try{
      if (!req.payload._id ) { // || getUser(req.payload._id) === undefined
        res.status(401).json({
          "message" : "UnauthorizedError: private profile"
        });
      }
      resolve();
    } catch(err) {
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
          MongoUser.findOne({mail: user.email}).then( result => {

           if (result == null){
                 console.log("pas trouvé")
             }
             else {
                user.provideId = result._id;
             }
          })
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
