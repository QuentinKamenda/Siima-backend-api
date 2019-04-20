
const User = require("../../models/user/user");
const Img = require("../../models/media/image")
const fs = require("fs");

module.exports.call = function (req,res ) {

  var new_img = new Img;
  new_img.img.data = fs.readFileSync(req.file.path);
  new_img.img.contentType = 'image/jpeg';

  new_img.save()
  .then( result => {
    console.log(result)
    let userId ={_id: req.params.userId};
    let idPhoto = { profile_picture: result._id };
    User.findOneAndUpdate( userId , idPhoto  ).then(
      result = {
        status: "success",
        message: "User profile picture updated",
        _id: req.params.userId,
        new_username: req.body.username
      });
    res.json(result);
  })
  .catch(error => {
      console.log(`Error caught in ` + "set-user-photo" + ` - ${error.message}`);
      errorHandler.handleError(req, res, error);
  })
};
