// CORE MODULES
const fs = require("fs");
const express = require("express");
const { create } = require("domain");
const morgan = require("morgan");

const app = express();

// CUSTOM MODULES
const tourRoute = require("./routes/tourRoutes");
const userRoute = require("./routes/userRoutes");

// REGULAR MODULES
app.use(morgan("dev"));
app.use(express.json());

// TOUR ROUTER USED
app.use("/api/v1/tours", tourRoute);

// USER ROUTER USED
app.use("/api/v1/users", userRoute);

module.exports = app;
