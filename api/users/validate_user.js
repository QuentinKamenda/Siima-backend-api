const helper_firebase = require("../../helpers/firebase");

 module.exports.call = function (req, res) {

    helper_firebase.sendLinkEmail();


 };
