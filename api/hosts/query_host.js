// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Host = require("../../models/host/host");

module.exports.call = function (req, res) {

    let functionName = "query-animator";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
        console.log(functionName + " - Parameters checked successfully.");
        var page = parseInt(req.query.page) || 0;
        var limit = parseInt(req.query.limit) || 10;
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
        let queryTags = [];
        if(!(req.query.tags == undefined)){
          queryTags = req.query.tags.split(",");
          let query = {$and: [
            {description: {$regex: queryDesc}},
            {name: {$regex: queryName}},
            {mail: {$regex: queryMail}},
            {tags: {$in: queryTags}}
          ]}
        }
        console.log("Attempting query: ", query)
        Host.find(query)
          .sort({updatedAt: -1})
          .skip(page * limit)
          .limit(limit)
          .then(rslt => {
            let result;
          if (rslt === null || rslt.length < 1) {
            result = {
              status: "fail",
              message: "No host found with these parameters"
            };
            res.status(400);
          }
          else {
            result = {
              status: "success",
              message: "Hosts retrieved",
              hosts: rslt
            }
            res.status(200);
          }
          res.json(result);
        })

      })

      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
