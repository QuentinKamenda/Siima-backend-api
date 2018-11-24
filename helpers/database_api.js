//Database Helper functions
const request = require("request-promise");

require("./config/config");

const DBL = process.env.DB_URL;
const AUTH = process.env.AUTH;


module.exports.insertDatabase = function (method, end_point, data) {
    let options = {
        method: method,
        uri: DB_URL + end_point,
        body: data,
        headers: {
            auth: AUTH
        },
        json: true
    };
    return request(options)
        .then(result => {
            return result;
        }).catch(err => {
            let response = {
                isInternal: true,
                message: JSON.stringify(err)
            };
            throw response;
        });
};

module.exports.getDatabase = function (method, end_point) {
    let options = {
        method: method,
        uri: DB_URL + end_point,
        headers: {
            auth: AUTH
        },
        json: true
    };
    return request(options)
        .then(result => {
            return result;
        }).catch(err => {
            let response = {
                isInternal: true,
                message: JSON.stringify(err)
            };
            throw response;
        });
};
