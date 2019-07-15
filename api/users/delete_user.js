const helper_firebase = require("../../helpers/firebase");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

 module.exports.call = async function (req, res) {

   let functionName = 'delete-user';

   await firebase.handleUnauthorizedError(req,res);

   if (req.payload._id === req.params.userId ){
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
               };
               res.status(400);
             }
             else {
               let removed = result;
               result.remove();
               let errorMessage = helper_firebase.deleteUser();
               result = {
                 status: "success",
                 message: "User deleted",
                 removed: removed
               };
               res.status(200);
             }
             res.json(result);
           })
         })
       .catch(error => {
       console.log(`Error caught in ` + functionName + ` - ${errorMessage}`)
       errorHandler.handleError(req, res, error);
     });
   }
   else {
     let errorMessage = {
       status: "fail",
       message: "User not allowed to delete User: Token and User don't match"
     }
     res.status(400);
     res.json(errorMessage);
   }

 };
