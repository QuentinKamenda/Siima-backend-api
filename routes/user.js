"use strict";

const express = require("express");
const router = express.Router();

// The API files
const createUser = require("../api/create_user");
const deleteUser = require("../api/delete_user");

const getUserName = require("../api/get_user_name");

const setUserName = require("../api/set_user_name");
const setUserMail = require("../api/set_user_mail");

// The routing
router.post("/", (req, res) => {
    createUser.call(req, res);
});
router.delete("/", (req, res) => {
    deleteUser.call(req, res);
});
router.put("/:userId/name", (req, res) => {
    setUserName.call(req, res);
});
router.put("/:userId/mail", (req, res) => {
    setUserMail.call(req, res);
});
router.get("/:userId/name", (req, res) => {
    getUserName.call(req, res);
});

module.exports = router;
