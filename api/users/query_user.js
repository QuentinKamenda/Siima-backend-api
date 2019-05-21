// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const User = require("../../models/user/user");

module.exports.call = function (req, res) {

    let functionName = "query-user";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
        console.log(functionName + " - Parameters checked successfully.");
        var page = parseInt(req.query.page) || 0;
        var limit = parseInt(req.query.limit) || 10;
        let queryName = '';
        if(!(req.query.name == undefined)){ queryName = '^'+req.query.name+'$'}
        let queryMail = '';
        if(!(req.query.mail == undefined)){ queryMail = '^'+req.query.mail+'$'}
        let query = {$and: [
          {name: {$regex: queryName}},
          {mail: {$regex: queryMail}}
        ]}
        User.find(query)
          .sort({updatedAt: -1})
          .skip(page * limit)
          .limit(limit)
          .then(result => {
          if (result === null || result.length < 1) {
            result = {
              status: "fail",
              message: "No user found with these parameters"
            };
          }
          res.json(result);
        })

      })

      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
