/*
 * Error Handler to print (and later log in DB) the errors sent at any step of the process
 *
*/


//A function to handle catchall errors.
module.exports.handleError = function(req, res, error){

    //If error is external, we kick out the request immediately.
    if (error.isInternal === false){
        let response = {
            status: "fail",
            error: error.message
        };
        return res.json(response);
    }

    //If error is internal, we will log that into our Log DB
    if (error.isInternal !== true){
          console.log("Error is logged successfully");
          let response = {
             status: "fail",
             error: "request failed. (error code: " + error.code + ")"
          };
          res.json(response);
    }
    else{
        //Errors are random (Catch-all)
        console.log("Error are from Nodejs or other third party libraries");
        let response = {
            status: "fail",
            error: "request failed. (error code: " + error.code + ")"
        };
        res.json(response);
    }
};
