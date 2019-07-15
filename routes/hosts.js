"use strict";

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'SIIMA',
  userProperty: 'payload'
});

const express = require("express");
const router = express.Router();

/// The API files

const createHost = require("../api/hosts/create_host");
const deleteHost = require("../api/hosts/delete_host");
const getHost = require("../api/hosts/get_host");
const modifyHost = require("../api/hosts/modify_host");
const queryHost = require("../api/hosts/query_host");

const setHostProfilePicture = require("../api/hosts/set_host_profile_picture");
const getHostProfilePicture = require("../api/hosts/get_host_profile_picture");
const getHostMediaList = require("../api/hosts/get_host_media_list");

const addHostMedia = require("../api/hosts/add_host_media");
const removeHostMedia = require("../api/hosts/remove_host_media");

const addHostTags = require("../api/hosts/add_host_tags");
const removeHostTags = require("../api/hosts/remove_host_tags");

/*
const addHostAdmin = require("../api/hosts/add_host_admin");
const addHostEvent = require("../api/hosts/add_host_event");
const addHostOffer = require("../api/hosts/add_host_offer");
const addHostLink = require("../api/hosts/add_host_link");
const addHostContact = require("../api/hosts/add_host_contact");
const addHostMedium = require("../api/hosts/add_host_medium");
const addHostComment = require("../api/hosts/add_host_comment");

const removeHostAdmin = require("../api/hosts/remove_host_admin");
const removeHostEvent = require("../api/hosts/remove_host_event");
const removeHostOffer = require("../api/hosts/remove_host_offer");
const removeHostLink = require("../api/hosts/remove_host_link");
const removeHostContact = require("../api/hosts/remove_host_contact");
const removeHostMedium = require("../api/hosts/remove_host_medium");
const removeHostComment = require("../api/hosts/remove_host_comment");

const removeAllHostAdmin = require("../api/hosts/remove_all_host_admin");
const removeAllHostEvent = require("../api/hosts/remove_all_host_event");
const removeAllHostOffer = require("../api/hosts/remove_all_host_offer");
const removeAllHostLink = require("../api/hosts/remove_all_host_link");
const removeAllHostContact = require("../api/hosts/remove_all_host_contact");
const removeAllHostMedium = require("../api/hosts/remove_all_host_medium");
const removeAllHostComment = require("../api/hosts/remove_all_host_comment");
*/

// The current hierarchy is at /hosts

// The routing
router.post("/", auth, (req, res) => {
    createHost.call(req, res);
});
router.delete("/:hostId", auth, (req, res) => {
    deleteHost.call(req, res);
});
router.get("/:hostId", (req, res) => {
    getHost.call(req, res);
});
router.patch("/:hostId", auth, (req, res) => {
    modifyHost.call(req, res);
});
router.get("/", (req,res) => {
    queryHost.call(req,res);
})

router.put("/:hostId/profile_picture", auth, (req,res) => {
  setHostProfilePicture.call(req,res);
});
router.get("/:hostId/profile_picture", (req, res) => {
  getHostProfilePicture.call(req, res);
});
router.delete("/:hostId/media",  auth, (req, res) => {
    removeHostMedia.call(req, res);
});
router.put("/:hostId/media", auth, (req, res) => {
    addHostMedia.call(req, res);
});
router.get("/:hostId/media_list", (req, res) => {
    getHostMediaList.call(req, res);
});

router.put("/:hostId/tags", auth, (req, res) => {
    addHostTags.call(req, res);
});
router.delete("/:hostId/tags", auth, (req, res) => {
    removeHostTags.call(req, res);
});

module.exports = router;

/* TODO: Remove if validated by the team, Retrieve from Graveyard if not
const setHostName = require("../api/hosts/set_host_name");
const setHostMail = require("../api/hosts/set_host_mail");
const setHostLocation = require("../api/hosts/set_host_location");
const setHostDescription = require("../api/hosts/set_host_description");

const getHostName = require("../api/hosts/get_host_name");
const getHostMail = require("../api/hosts/get_host_mail");
const getHostLocation = require("../api/hosts/get_host_location");
const getHostDescription = require("../api/hosts/get_host_description");

const getHostTags = require("../api/hosts/get_host_tags");
const setHostTags = require("../api/hosts/set_host_tags");

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

router.get("/:hostId/tags", (req, res) => {
    getHostTags.call(req, res);
});
router.post("/:hostId/tags", (req, res) => {
    setHostTags.call(req, res);
});
*/
