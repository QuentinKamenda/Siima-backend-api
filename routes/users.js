"use strict";

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'SIIMA',
  userProperty: 'payload'
});

const express = require("express");
const router = express.Router();
const helper_firebase = require("../helpers/firebase");

// The API files
const validateUser = require("../api/users/validate_user");
const signinUser = require("../api/users/signin_user");
const signoutUser = require("../api/users/signout_user");
const setUserPassword = require("../api/users/set_user_password");

const createUser = require("../api/users/create_user");
const deleteUser = require("../api/users/delete_user");
const getUser = require("../api/users/get_user");
const modifyUser = require("../api/users/modify_user");
const queryUser = require("../api/users/query_user");

const setUserProfilePicture = require("../api/users/set_user_profile_picture");
const getUserPhoto = require("../api/users/get_user_profile_picture");
const getMedia = require("../api/users/get_media");

const addUserFriend = require("../api/users/add_user_friend");
const removeUserFriend = require("../api/users/remove_user_friend");

/*
const getUserPassword = require("../api/users/get_user_password");
const getUserProfilePicture = require("../api/users/get_user_profile_picture");
const setUserProfilePicture = require("../api/users/set_user_profile_picture");
*/

// The routing
router.post("/:userId/validate", (req,res) => {
    validateUser.call(req, res);
});
router.post("/signin", (req,res) => {
    signinUser.call(req, res);
});

router.get("/:userId/signout", auth, signoutUser.call , (req, res) => {
    signoutUser.call(req, res);
});

router.put("/:userId/password", (req, res) => {
    setUserPassword.call(req, res);
});

router.post("/", (req, res) => {
    createUser.call(req, res);
});
router.delete("/:userId", auth, (req, res) => {
    deleteUser.call(req, res);
});
router.get("/:userId", (req, res) => {
    getUser.call(req, res);
});
router.patch("/:userId", auth, (req, res) => {
    modifyUser.call(req, res);
});
router.get("/", (req,res) => {
    queryUser.call(req, res);
})

router.put("/:userId/profile_picture", auth,(req,res) => {
  setUserProfilePicture.call(req,res);
});
router.get("/:userId/profile_picture", (req, res) => {
    getUserPhoto.call(req, res);
});
router.get("/:mediaId/media", (req, res) => {
    getMedia.call(req, res);
});

router.post("/:userId/friends", auth, (req, res) => {
    addUserFriend.call(req, res);
});
router.delete("/:userId/friends", auth, (req, res) => {
    removeUserFriend.call(req, res);
});

module.exports = router;


/* TODO: Remove if validated by the team, Retrieve from Graveyard if not
const getUserName = require("../api/users/get_user_name");
const getUserMail = require("../api/users/get_user_mail");
const getUserBirthdate = require("../api/users/get_user_birthdate");

const setUserName = require("../api/users/set_user_name");
const setUserMail = require("../api/users/set_user_mail");
const setUserBirthdate = require("../api/users/set_user_birthdate");

router.patch("/:userId/username", (req, res) => {
    setUserName.call(req, res);
});
router.patch("/:userId/mail", (req, res) => {
    setUserMail.call(req, res);
});
router.patch("/:userId/birthdate", (req, res) => {
    setUserBirthdate.call(req, res);
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
*/
