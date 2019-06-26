// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const User = require("../../models/user/user");

module.exports.call = function (req, res) {

    let functionName = "add-user-friend";

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
                res.json(result)
              }
              else {
                let previous = result;
                User.findOne({mail: req.body.friend}).then(friendToAdd => {
                  console.log(friendToAdd)
                    if (friendToAdd === null) {
                        result = {
                          status: "fail",
                          message: "No user registered with this mail address"
                        }
                        res.json(result)
                    }
                    else {
                      result.friends.push(friendToAdd);
                      result.save();
                      response = {
                        status: "success",
                        message: "User updated",
                        _id: req.params.userId,
                        previous_user: previous,
                        friend_added: req.body.friend
                      }
                      res.json(response)
                    }
                })
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
        message: "User not allowed to add a friend to User: Token and User don't match"
      }
      res.status(400);
      res.json(errorMessage);
    }
};
