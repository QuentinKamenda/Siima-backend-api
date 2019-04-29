"use strict";

const express = require("express");
const router = express.Router();

/// The API files

const createHost = require("../api/hosts/create_host");
const deleteHost = require("../api/hosts/delete_host");
const getHost = require("../api/hosts/get_host");

const setHostName = require("../api/hosts/set_host_name");
const setHostMail = require("../api/hosts/set_host_mail");
const setHostLocation = require("../api/hosts/set_host_location");
const setHostDescription = require("../api/hosts/set_host_description");

/*
const setHostProfilePicture = require("../api/hosts/set_host_profile_picture");
const setHostBackgroundPicture = require("../api/hosts/set_host_background_picture");
*/

const getHostName = require("../api/hosts/get_host_name");
const getHostMail = require("../api/hosts/get_host_mail");
const getHostLocation = require("../api/hosts/get_host_location");
const getHostDescription = require("../api/hosts/get_host_description");

/*
const getHostProfilePicture = require("../api/hosts/get_host_profile_picture");
const getHostBackgroundPicture = require("../api/hosts/get_host_background_picture");

const addHostAdmin = require("../api/hosts/add_host_admin");
const addHostTag = require("../api/hosts/add_host_tag");
const addHostEvent = require("../api/hosts/add_host_event");
const addHostOffer = require("../api/hosts/add_host_offer");
const addHostLink = require("../api/hosts/add_host_link");
const addHostContact = require("../api/hosts/add_host_contact");
const addHostMedium = require("../api/hosts/add_host_medium");
const addHostComment = require("../api/hosts/add_host_comment");

const removeHostAdmin = require("../api/hosts/remove_host_admin");
const removeHostTag = require("../api/hosts/remove_host_tag");
const removeHostEvent = require("../api/hosts/remove_host_event");
const removeHostOffer = require("../api/hosts/remove_host_offer");
const removeHostLink = require("../api/hosts/remove_host_link");
const removeHostContact = require("../api/hosts/remove_host_contact");
const removeHostMedium = require("../api/hosts/remove_host_medium");
const removeHostComment = require("../api/hosts/remove_host_comment");

const removeAllHostAdmin = require("../api/hosts/remove_all_host_admin");
const removeAllHostTag = require("../api/hosts/remove_all_host_tag");
const removeAllHostEvent = require("../api/hosts/remove_all_host_event");
const removeAllHostOffer = require("../api/hosts/remove_all_host_offer");
const removeAllHostLink = require("../api/hosts/remove_all_host_link");
const removeAllHostContact = require("../api/hosts/remove_all_host_contact");
const removeAllHostMedium = require("../api/hosts/remove_all_host_medium");
const removeAllHostComment = require("../api/hosts/remove_all_host_comment");
*/

// The current hierarchy is at /hosts

// The routing
router.post("/", (req, res) => {
    createHost.call(req, res);
});
router.delete("/:hostId", (req, res) => {
    deleteHost.call(req, res);
});
router.get("/:hostId", (req, res) => {
    getHost.call(req, res);
});

router.patch("/:hostId/name", (req, res) => {
    setHostName.call(req, res);
});
router.patch("/:hostId/mail", (req, res) => {
    setHostMail.call(req, res);
});
router.patch("/:hostId/location", (req, res) => {
    setHostLocation.call(req, res);
});
router.patch("/:hostId/description", (req, res) => {
    setHostDescription.call(req, res);
});

router.get("/:hostId/name", (req, res) => {
    getHostName.call(req, res);
});
router.get("/:hostId/mail", (req, res) => {
    getHostMail.call(req, res);
});
router.get("/:hostId/location", (req, res) => {
    getHostLocation.call(req, res);
});
router.get("/:hostId/description", (req, res) => {
    getHostDescription.call(req, res);
});

module.exports = router;
