// // Import Helper methods
// const helper1 = require("../helpers/helper1");
// const helper2 = require("../helpers/helper2");
// const helperError = require("../helpers/error_handler");
//
// module.exports.call = function (req, res) {
//
//     //Some fundamental info
//
//     //Check whether API token is included as a param and whether it is valid in our DB.
//     helper1.method1(req)
//         .then(result => {
//             // Do something
//             return helper1.method2(req, functionName);
//         })
//         .then(() => {
//             // Do something
//             return helper2.method1(functionName, req);
//         })
//         .then(() => {
//           // Do something
//             return helper1.method3();
//         })
//         .catch(error => {
//             console.log(`error caught: ${error.message}`);
//             helperError.handleError(req, res, error);
//
//         });
// };
