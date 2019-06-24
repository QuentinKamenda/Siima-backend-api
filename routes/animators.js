"use strict";

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'SIIMA',
  userProperty: 'payload'
});

const express = require("express");
const router = express.Router();

/// The API files
const createAnimator = require("../api/animators/create_animator");
const deleteAnimator = require("../api/animators/delete_animator");
const getAnimator = require("../api/animators/get_animator");
const modifyAnimator = require("../api/animators/modify_animator");
const queryAnimator = require("../api/animators/query_animator");

const setAnimatorProfilePicture = require("../api/animators/set_animator_profile_picture");
const getAnimatorProfilePicture = require("../api/animators/get_animator_profile_picture");
const addAnimatorMedia = require("../api/animators/add_animator_media");
const removeAnimatorMedia = require("../api/animators/remove_animator_media");
const getAnimatorMediaList = require("../api/animators/get_animator_media_list");

const addAnimatorTags = require("../api/animators/add_animator_tags");
const removeAnimatorTags = require("../api/animators/remove_animator_tags");

/*
const addAnimatorAdmin = require("../api/animators/add_animator_admin");
const addAnimatorEvent = require("../api/animators/add_animator_event");
const addAnimatorOffer = require("../api/animators/add_animator_offer");
const addAnimatorLink = require("../api/animators/add_animator_link");
const addAnimatorContact = require("../api/animators/add_animator_contact");
const addAnimatorMedium = require("../api/animators/add_animator_medium");
const addAnimatorComment = require("../api/animators/add_animator_comment");

const removeAnimatorAdmin = require("../api/animators/remove_animator_admin");
const removeAnimatorTag = require("../api/animators/remove_animator_tag");
const removeAnimatorEvent = require("../api/animators/remove_animator_event");
const removeAnimatorOffer = require("../api/animators/remove_animator_offer");
const removeAnimatorLink = require("../api/animators/remove_animator_link");
const removeAnimatorContact = require("../api/animators/remove_animator_contact");
const removeAnimatorMedium = require("../api/animators/remove_animator_medium");
const removeAnimatorComment = require("../api/animators/remove_animator_comment");

const removeAllAnimatorAdmin = require("../api/animators/remove_all_animator_admin");
const removeAllAnimatorTag = require("../api/animators/remove_all_animator_tag");
const removeAllAnimatorEvent = require("../api/animators/remove_all_animator_event");
const removeAllAnimatorOffer = require("../api/animators/remove_all_animator_offer");
const removeAllAnimatorLink = require("../api/animators/remove_all_animator_link");
const removeAllAnimatorContact = require("../api/animators/remove_all_animator_contact");
const removeAllAnimatorMedium = require("../api/animators/remove_all_animator_medium");
const removeAllAnimatorComment = require("../api/animators/remove_all_animator_comment");

*/
// The current hierarchy is at /animators

// The routing
router.post("/", auth,(req, res) => {
    createAnimator.call(req, res);
});
router.delete("/:animatorId", (req, res) => {
    deleteAnimator.call(req, res);
});
router.get("/:animatorId", (req, res) => {
    getAnimator.call(req, res);
});
router.patch("/:animatorId", (req, res) => {
    modifyAnimator.call(req, res);
});
router.get("/", (req,res) => {
    queryAnimator.call(req, res);
})

router.put("/:animatorId/profile_picture", auth,(req,res) => {
  setAnimatorProfilePicture.call(req,res);
});
router.get("/:animatorId/profile_picture", (req, res) => {
  getAnimatorProfilePicture.call(req, res);
});
router.delete("/:animatorId/media", auth, (req, res) => {
    removeAnimatorMedia.call(req, res);
});
router.put("/:animatorId/media",  auth,(req, res) => {
    addAnimatorMedia.call(req, res);
});
router.get("/:animatorId/media_list", (req, res) => {
    getAnimatorMediaList.call(req, res);
});

router.put("/:animatorId/tags", (req, res) => {
    addAnimatorTags.call(req, res);
});
router.delete("/:animatorId/tags", (req, res) => {
    removeAnimatorTags.call(req, res);
});

module.exports = router;

/* TODO: Remove if validated by the team, Retrieve from Graveyard if not
const setAnimatorName = require("../api/animators/set_animator_name");
const setAnimatorMail = require("../api/animators/set_animator_mail");
const setAnimatorLocation = require("../api/animators/set_animator_location");
const setAnimatorDescription = require("../api/animators/set_animator_description");

const getAnimatorName = require("../api/animators/get_animator_name");
const getAnimatorMail = require("../api/animators/get_animator_mail");
const getAnimatorLocation = require("../api/animators/get_animator_location");
const getAnimatorDescription = require("../api/animators/get_animator_description");

const getAnimatorTags = require("../api/animators/get_animator_tags");
const setAnimatorTags = require("../api/animators/set_animator_tags");


router.patch("/:animatorId/name", (req, res) => {
    setAnimatorName.call(req, res);
});
router.patch("/:animatorId/mail", (req, res) => {
    setAnimatorMail.call(req, res);
});
router.patch("/:animatorId/location", (req, res) => {
    setAnimatorLocation.call(req, res);
});
router.patch("/:animatorId/description", (req, res) => {
    setAnimatorDescription.call(req, res);
});
router.get("/:animatorId/name", (req, res) => {
    getAnimatorName.call(req, res);
});
router.get("/:animatorId/mail", (req, res) => {
    getAnimatorMail.call(req, res);
});
router.get("/:animatorId/location", (req, res) => {
    getAnimatorLocation.call(req, res);
});
router.get("/:animatorId/description", (req, res) => {
    getAnimatorDescription.call(req, res);
});

router.get("/:animatorId/tags", (req, res) => {
    getAnimatorTags.call(req, res);
});
router.post("/:animatorId/tags", (req, res) => {
    setAnimatorTags.call(req, res);
});
*/
