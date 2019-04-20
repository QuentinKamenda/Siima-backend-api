
const User = require("../../models/user/user");
const Img = require("../../models/media/image")
const fs = require("fs");
const errorHandler = require("../../helpers/error_handler");

module.exports.call = function (req,res ) {

  let functionName = "set_user_photo";

  let userId ={_id: req.params.userId};
  console.log(req.file.id);
  let newImage = new Img({
    photo : req.file.id
  });

  newImage.save().then((picture)=>{
    User.findOneAndUpdate( {_id: req.params.userId} , { profile_picture: picture.id })
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
  })
};
