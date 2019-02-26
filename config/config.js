"use strict";

const env = process.env.NODE_ENV || "development";

let config = require("./config.json");

// Load common environment variables
let commonConfig = config.common;
for (let property in commonConfig) {
    process.env[property] = commonConfig[property];
}

// Load environment specific variables
let envConfig = config[env];
for (let property in envConfig) {
    process.env[property] = envConfig[property];
}

module.exports = config;
