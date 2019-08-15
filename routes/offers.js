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

const publishOffer = require("../api/offers/publish_offer");
const transformOffer = require("../api/offers/transform_offer_into_event");

const setOfferProfilePicture = require("../api/offers/set_offer_profile_picture")
const getOfferProfilePicture = require("../api/offers/get_offer_profile_picture");
const removeOfferMedia = require("../api/offers/remove_offer_media");
const addOfferMedia = require("../api/offers/add_offer_media");
// The current hierarchy is at /offers

// The routing
router.post("/", auth,(req, res)  => {
    createOffer.call(req, res);
});
router.delete("/:offerId", auth, (req, res) => {
    deleteOffer.call(req, res);
});
router.get("/:offerId",auth, (req, res) => {
    getOffer.call(req, res);
});
router.patch("/:offerId", auth, (req, res) => {
    modifyOffer.call(req, res);
});
router.get("/", auth, (req, res) => {
    queryOffer.call(req, res);
});

router.post("/:offerId/publish", auth, (req, res) => {
    publishOffer.call(req, res);
});
router.post("/:offerId/transform", auth, (req, res) => {
    transformOffer.call(req, res);
});

router.put("/:offerId/profile_picture", auth, (req,res) => {
  setOfferProfilePicture.call(req,res);
});
router.get("/:offerId/profile_picture", (req, res) => {
  getOfferProfilePicture.call(req, res);
});
router.delete("/:offerId/media", auth, (req, res) => {
    removeOfferMedia.call(req, res);
});
router.put("/:offerId/media",  auth, (req, res) => {
    addOfferMedia.call(req, res);
});


module.exports = router;
