"use strict";

const express = require("express");
const router = express.Router();

/// The API files
const createOffer = require("../api/offers/create_offer");
const deleteOffer = require("../api/offers/delete_offer");
const getOffer = require("../api/offers/get_offer");
const modifyOffer = require("../api/offers/modify_offer");
const queryOffer = require("../api/offers/query_offer");

// The current hierarchy is at /offers

// The routing
router.post("/", (req, res) => {
    createOffer.call(req, res);
});
router.delete("/:offerId", (req, res) => {
    deleteOffer.call(req, res);
});
router.get("/:offerId", (req, res) => {
    getOffer.call(req, res);
});
router.patch("/:offerId", (req, res) => {
    modifyOffer.call(req, res);
});
router.get("/", (req, res) => {
    queryOffer.call(req, res);
});

module.exports = router;
