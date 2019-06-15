// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Event = require("../../models/event/event");

module.exports.call = function (req, res) {

    let functionName = "query-event";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
        console.log(functionName + " - Parameters checked successfully.");
        var page = parseInt(req.query.page) || 0;
        var limit = parseInt(req.query.limit) || 10;
        let queryName = '';
        if(!(req.query.name == undefined)){ queryName = '^'+req.query.name+'$'}
        console.log(queryName)
        let queryDesc = '';
        if(!(req.query.description == undefined)){ queryDesc = ''+req.query.description+''}
        console.log(queryDesc)
        let query = {$and: [
          {description: {$regex: queryDesc}},
          {name: {$regex: queryName}}
        ]}
        let queryTags = [];
        if(!(req.query.tags == undefined)){
          queryTags = req.query.tags.split(",");
          query = {$and: [
            {description: {$regex: queryDesc}},
            {name: {$regex: queryName}},
            {tags: {$in: queryTags}}
          ]}
        }
        console.log("Attempting query: ", query)
        Event.find(query)
          .sort({updatedAt: -1})
          .skip(page * limit)
          .limit(limit)
          .then(rslt => {
            if (rslt === null || rslt.length < 1) {
              let result = {
                status: "fail",
                message: "No event found with these parameters"
              };
            else {
              let result = {
                status: "success",
                message: "Evets retieved",
                events: rslt
              }
            }
          }
          res.json(result);
        })

      })

      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
