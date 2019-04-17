"use strict";

const URLMongoDB = 'mongodb://localhost/siima_db';
let infoFile;

const express = require("express");
const router = express.Router();
const multerStorage = require("../helpers/multerStorage");
const multer = require("multer");
// The API files
const createUser = require("../api/users/create_user");
const validateUser = require("../api/users/validate_user");
const signinUser = require("../api/users/signin_user");
const setUserPhoto = require("../api/users/set_user_photo");
/*
const deleteUser = require("../api/users/delete_user");
const getUser = require("../api/users/get_user");

const getUserName = require("../api/users/get_user_name");
const getUserMail = require("../api/users/get_user_mail");
const getUserBirthdate = require("../api/users/get_user_birthdate");

const setUserName = require("../api/users/set_user_name");
const setUserMail = require("../api/users/set_user_mail");
const setUserBirthdate = require("../api/users/set_user_birthdate");

const addUserFriend = require("../api/users/add_user_friend");
const removeUserFriend = require("../api/users/remove_user_friend");
/*
const getUserPassword = require("../api/users/get_user_password");
const getUserProfilePicture = require("../api/users/get_user_profile_picture");

const setUserProfilePicture = require("../api/users/set_user_profile_picture");
*/

// The routing
router.post("/", (req, res) => {
    createUser.call(req, res);
});
router.post("/validate", (req,res) => {
    validateUser.call(req, res);
});

router.post("/signin", (req,res) => {
    signinUser.call(req, res);
});

var upload = multerStorage.getUpload(URLMongoDB).single('avatar')
router.post("/upload", function (req, res,next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else {
      // An unknown error occurred when uploading.
    }
    setUserPhoto.call(req, res , next );
  });

});


/*
router.delete("/:userId", (req, res) => {
    deleteUser.call(req, res);
});
router.put("/:userId/username", (req, res) => {
    setUserName.call(req, res);
});
router.put("/:userId/mail", (req, res) => {
    setUserMail.call(req, res);
});
router.put("/:userId/birthdate", (req, res) => {
    setUserBirthdate.call(req, res);
});

router.post("/:userId/friends", (req, res) => {
    addUserFriend.call(req, res);
});
router.delete("/:userId/friends", (req, res) => {
    removeUserFriend.call(req, res);
});
/*
router.put("/:userId/password", (req, res) => {
    setUserPassword.call(req, res);
});
router.put("/:userId/photo", (req, res) => {
    setUserProfilePicture.call(req, res);
});
*/
router.get("/:userId", (req, res) => {
    getUser.call(req, res);
});
router.get("/:userId/username", (req, res) => {
    getUserName.call(req, res);
});
router.get("/:userId/mail", (req, res) => {
    getUserMail.call(req, res);
});
router.get("/:userId/birthdate", (req, res) => {
    getUserBirthdate.call(req, res);
});
/*
router.get("/:userId/photo", (req, res) => {
    getUserProfilePicture.call(req, res);
});
*/
module.exports = router;
