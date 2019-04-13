"use strict";

const express = require("express");
const router = express.Router();

/// The API files
const createAnimator = require("../api/animators/create_animator");
const deleteAnimator = require("../api/animators/delete_animator");
const getAnimator = require("../api/animators/get_animator");

/*
const setAnimatorName = require("../api/animators/set_animator_name");
const setAnimatorLocation = require("../api/animators/set_animator_location");
const setAnimatorDescription = require("../api/animators/set_animator_description");
const setAnimatorProfilePicture = require("../api/animators/set_animator_profile_picture");
const setAnimatorBackgroundPicture = require("../api/animators/set_animator_background_picture");

const getAnimatorName = require("../api/animators/get_animator_name");
const getAnimatorLocation = require("../api/animators/get_animator_location");
const getAnimatorDescription = require("../api/animators/get_animator_description");
const getAnimatorProfilePicture = require("../api/animators/get_animator_profile_picture");
const getAnimatorBackgroundPicture = require("../api/animators/get_animator_background_picture");

const addAnimatorAdmin = require("../api/animators/add_animator_admin");
const addAnimatorTag = require("../api/animators/add_animator_tag");
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
router.post("/", (req, res) => {
    createAnimator.call(req, res);
});
router.delete("/:animatorId", (req, res) => {
    deleteAnimator.call(req, res);
});
router.get("/:animatorId", (req, res) => {
    getAnimator.call(req, res);
});


module.exports = router;
