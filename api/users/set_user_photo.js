
const User = require("../../models/user/user");
const Image = require("../../models/media/image")
module.exports.call = function (req,res) {
  let response = {
    status: "success",
    message: "image created",
  };
  res.json(response);
};
