"use strict";

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'SIIMA',
  userProperty: 'payload'
});

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
router.delete("/:offerId", auth, (req, res) => {
    deleteOffer.call(req, res);
});
router.get("/:offerId", (req, res) => {
    getOffer.call(req, res);
});
router.patch("/:offerId", auth, (req, res) => {
    modifyOffer.call(req, res);
});
router.get("/", (req, res) => {
    queryOffer.call(req, res);
});

module.exports = router;
