const helper_firebase = require("../../helpers/firebase");
const errorHandler = require("../../helpers/error_handler");

 module.exports.call = function (req, res) {
    let functionName = 'signout-user';
    helper_firebase.handleUnauthorizedError(req,res).then( () => {
      let response = {
        status: "success",
        message: "user signed out",
      };
      res.json(response);
    });
 };
