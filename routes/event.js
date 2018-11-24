"use strict";

const express = require("express");
const router = express.Router();

/// The API files
const createEvent = require("../api/create_event");
const deleteEvent = require("../api/delete_event");


// The routing
router.post("/", (req, res) => {
    createEvent.call(req, res);
});
router.delete("/", (req, res) => {
    deleteEvent.call(req, res);
});

module.exports = router;
