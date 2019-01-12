"use strict";

console.log("Starting API server");

require("./config/config");

const express = require("express");
const json = require("body-parser");

// TODO: Add routing groups here
const users_routes = require("./routes/users");
const animators_routes = require("./routes/animators");
const hosts_routes = require("./routes/hosts");
const events_routes = require("./routes/events");

const PORT = process.env.PORT;
const API_URL = process.env.API_ROUTE;


const app = express();
const cors = require("cors");

app.disable("x-powered-by");
app.use(json());
app.use(cors());

//Detect JSON format errouser
app.use((error, req, res, next) => {
    if(error instanceof SyntaxError) {
        res.status(400)
            .json({
                "status": "error",
                "message":"invalid json request format"
            });
    }else{
        next();
    }
});

// TODO: Add routing groups here
app.use(API_URL + "/users", users_routes);
app.use(API_URL + "/hosts", hosts_routes);
app.use(API_URL + "/animators", animators_routes);
app.use(API_URL + "/events", events_routes);

app.all("*", (req, res) => {
    res.status(404).send();
});

// Listen on port
let server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  // Initialize server shutdown method
  server = require("http-shutdown")(server);

  // Close all server connections upon interrupt signal
  process.on("SIGINT", () => {
    console.log("Stopping API server");

    server.shutdown(() => {
      console.log("Exited process");
      process.exit(1);
    });
  });
