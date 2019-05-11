// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Animator = require("../../models/animator/animator");

module.exports.call = function (req, res) {

    let functionName = "query-animator";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
        console.log(functionName + " - Parameters checked successfully.");
        let queryName = '';
        if(!(req.query.name == undefined)){ queryName = '^'+req.query.name+'$'}
        let queryMail = '';
        if(!(req.query.mail == undefined)){ queryMail = '^'+req.query.mail+'$'}
        let queryDesc = '';
        if(!(req.query.description == undefined)){ queryDesc = ''+req.query.description+''}
        let query = {$and: [
          {description: {$regex: queryDesc}},
          {name: {$regex: queryName}},
          {mail: {$regex: queryMail}}
        ]}
        Animator.find(query).then(result => {
          if (result === null || result.length < 1) {
            result = {
              status: "fail",
              message: "No animator found with these parameters"
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
