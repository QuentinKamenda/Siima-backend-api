"use strict";

const express = require("express");
const router = express.Router();

/// The API files
const createEvent = require("../api/events/create_event");
const deleteEvent = require("../api/events/delete_event");
const getEvent = require("../api/events/get_event");
const modifyEvent = require("../api/events/modify_event");

/*
const setEventName = require("../api/events/set_event_name");
const setEventLocation = require("../api/events/set_event_location");
const setEventDescription = require("../api/events/set_event_description");
const setEventProfilePicture = require("../api/events/set_event_profile_picture");
const setEventBackgroundPicture = require("../api/events/set_event_background_picture");

const getEventName = require("../api/events/get_event_name");
const getEventLocation = require("../api/events/get_event_location");
const getEventDescription = require("../api/events/get_event_description");
const getEventProfilePicture = require("../api/events/get_event_profile_picture");
const getEventBackgroundPicture = require("../api/events/get_event_background_picture");

const addEventAnimator = require("../api/events/add_event_animator");
const addEventHost = require("../api/events/add_event_host");
const addEventTag = require("../api/events/add_event_tag");
const addEventLink = require("../api/events/add_event_link");
const addEventContact = require("../api/events/add_event_contact");
const addEventMedium = require("../api/events/add_event_medium");
const addEventParticipant = require("../api/events/add_event_participant");
const addEventComment = require("../api/events/add_event_comment");
const addEventPost = require("../api/events/add_event_post");
const addEventQuestion = require("../api/events/add_event_question");

const removeEventAnimator = require("../api/events/remove_event_animator");
const removeEventHost = require("../api/events/remove_event_host");
const removeEventTag = require("../api/events/remove_event_tag");
const removeEventLink = require("../api/events/remove_event_link");
const removeEventContact = require("../api/events/remove_event_contact");
const removeEventMedium = require("../api/events/remove_event_medium");
const removeEventParticipant = require("../api/events/remove_event_participant");
const removeEventComment = require("../api/events/remove_event_comment");
const removeEventPost = require("../api/events/remove_event_post");
const removeEventQuestion = require("../api/events/remove_event_question");

const removeAllEventAnimator = require("../api/events/remove_all_event_animator");
const removeAllEventHost = require("../api/events/remove_all_event_host");
const removeAllEventTag = require("../api/events/remove_all_event_tag");
const removeAllEventLink = require("../api/events/remove_all_event_link");
const removeAllEventContact = require("../api/events/remove_all_event_contact");
const removeAllEventMedium = require("../api/events/remove_all_event_medium");
const removeAllEventParticipant = require("../api/events/remove_all_event_participant");
const removeAllEventComment = require("../api/events/remove_all_event_comment");
const removeAllEventPost = require("../api/events/remove_all_event_post");
const removeAllEventQuestion = require("../api/events/remove_all_event_question");
*/

// The current hierarchy is at /events

// The routing
router.post("/", (req, res) => {
    createEvent.call(req, res);
});
router.delete("/:eventId", (req, res) => {
    deleteEvent.call(req, res);
});
router.get("/:eventId", (req, res) => {
    getEvent.call(req, res);
});
router.patch("/:eventId", (req, res) => {
    modifyEvent.call(req, res);
});

module.exports = router;
