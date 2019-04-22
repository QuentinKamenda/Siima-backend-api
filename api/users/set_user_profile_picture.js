
const User = require("../../models/user/user");
const Img = require("../../models/media/image")
const fs = require("fs");
const errorHandler = require("../../helpers/error_handler");
const paramCheck = require("../../helpers/param_checker");

module.exports.call = function (req,res ) {

  let functionName = "set-user-profile-picture";

  paramCheck.checkParameters(req, functionName).then(()=>{
    let userId ={_id: req.params.userId};
    //create a new image object to store the name of the file
    let newImage = new Img({
      name : req.file.filename,
      id : req.file.id
    });
    //save the image
    newImage.save().then((picture)=>{
      //put the id of the image object into the corresponding user
      User.findOneAndUpdate( {_id: req.params.userId} , { profile_picture: picture._id })
      .then(()=>{
        let result = {
          status: "success",
          message: "User updated profile picture",
          _id: req.params.userId,
          new_username: req.body.username
        }

        res.json(result);
      });
    })
    .catch(error => {
        console.log(`Error caught in ` + functionName + ` - ${error.message}`);
        errorHandler.handleError(req, res, error);
    });
  });
};
