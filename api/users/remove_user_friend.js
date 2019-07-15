// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

const User = require("../../models/user/user");

module.exports.call = async function (req, res) {

    let functionName = "remove-user-friend";

    await firebase.handleUnauthorizedError(req,res);

    if (req.payload._id === req.params.userId){
      paramCheck.checkParameters(req, functionName)
        .then(() => {
            console.log(functionName + " - Parameters checked successfully.");
            let userId ={
              _id: req.params.userId
            };
            return userId;
        })
        .then(userId => {
            User.findOne(userId).then(result => {
              if (result === null) {
                result = {
                  status: "fail",
                  message: "No user found with this id"
                }
                res.status(400)
                res.json(result)
              }
              else {
                let previous = result;
                result.friends.pull(result);
                result.save();
                response = {
                  status: "success",
                  message: "User updated",
                  _id: req.params.userId,
                  previous_user: previous,
                  friend_removed: req.body.friend
                }
                res.status(200);
                res.json(response)
              }
            })
          })
        .catch(error => {
            console.log(`Error caught in ` + functionName + ` - ${error.message}`);
            errorHandler.handleError(req, res, error);
        })
    }
    else {
      let errorMessage = {
        status: "fail",
        message: "User not allowed to remove a friend of User: Token and User don't match"
      }
      res.status(400);
      res.json(errorMessage);
    }

};
