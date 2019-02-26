"use strict";

const express = require("express");
const router = express.Router();

// The API files

const createUser = require("../api/users/create_user");
const validateUser = require("../api/users/validate_user");
const signinUser = require("../api/users/signin_user");
/*
const deleteUser = require("../api/users/delete_user");
const getUser = require("../api/users/get_user");

const getUserName = require("../api/users/get_user_name");
const getUserMail = require("../api/users/get_user_mail");
const getUserPassword = require("../api/users/get_user_password");
const getUserBirthdate = require("../api/users/get_user_birthdate");
const getUserProfilePicture = require("../api/users/get_user_profile_picture");

const setUserName = require("../api/users/set_user_name");
const setUserMail = require("../api/users/set_user_mail");
const setUserPassword = require("../api/users/set_user_password");
const setUserBirthdate = require("../api/users/set_user_birthdate");
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
/*
router.delete("/:userId", (req, res) => {
    deleteUser.call(req, res);
});
router.put("/:userId/name", (req, res) => {
    setUserName.call(req, res);
});
router.put("/:userId/mail", (req, res) => {
    setUserMail.call(req, res);
});
router.put("/:userId/birthdate", (req, res) => {
    setUserBirthdate.call(req, res);
});
router.put("/:userId/password", (req, res) => {
    setUserPassword.call(req, res);
});
router.put("/:userId/photo", (req, res) => {
    setUserProfilePicture.call(req, res);
});
router.get("/:userId/name", (req, res) => {
    getUserName.call(req, res);
});
router.get("/:userId/mail", (req, res) => {
    getUserMail.call(req, res);
});
router.get("/:userId/password", (req, res) => {
    getUserPassword.call(req, res);
});
router.get("/:userId/birthdate", (req, res) => {
    getUserBirthdate.call(req, res);
});
router.get("/:userId/photo", (req, res) => {
    getUserProfilePicture.call(req, res);
});
*/
module.exports = router;
