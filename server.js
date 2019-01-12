"user strict";

console.log("Starting API server");

import "./config/config";

import express from "express";
import { json } from "body-parser";

// TODO: Add routing groups here
import users_routes from "./routes/users";
import animators_routes from "./routes/animators";
import hosts_routes from "./routes/hosts";
import events_routes from "./routes/events";

const PORT = process.env.PORT;
const API_URL = process.env.API_ROUTE;


const app = express();
import cors from "cors";

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
