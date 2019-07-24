// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
//const helperFirebase = require("../../helpers/firebase");

const User = require("../../models/user/user");
var firebase = require("firebase");

module.exports.call = function(req, res) {

    let functionName = "create-user";

    paramCheck.checkParameters(req, functionName)
        .then(() => {
            console.log(functionName + " - Parameters checked successfully.");
            let userInformation = new User({
                username: req.body.username,
                mail: req.body.mail
            });
            return userInformation;
        })
        .then(userInfo => {
            User.find({
                mail: userInfo.mail
            }).then(result => {
                if (result === null || result.length < 1) {
                    console.log('DEBUG: NO User already registered with this mail address, is OK')

                    userInfo.save().then(userInfo => {
                            //helperFirebase.signup(req, res);
                            firebase.auth().createUserWithEmailAndPassword(req.body.mail, req.body.password).then(userInfo => {
                                    let response = {
                                        status: "success",
                                        message: "user created",
                                        userInformation: userInfo
                                    };
                                    console.log(functionName + " - User " + req.body.mail + " created.")
                                    res.json(response);
                                })
                                .catch(error => {
                                    // Unable to create on firebase, Should delete from Mongo
                                    console.log(`Error caught in ` + functionName + ` - ${error.message}, Firebase already exists, user created twice`);
                                    errorHandler.handleError(req, res, error);
                                });
                        })
                        .catch(error => {
                            console.log(`Error caught in ` + functionName + ` - ${error.message}`);
                            errorHandler.handleError(req, res, error);
                        });


                } else {
                    let response = {
                        status: "fail",
                        message: "User already registered with this email"
                    }
                    console.log('DEBUG: User already registered in Mongo, not OK !')
                    res.json(response)
                }
            })


        })
        .catch(error => {
            console.log(`Error caught in ` + functionName + ` - ${error.message}`);
            errorHandler.handleError(req, res, error);
        });
};
