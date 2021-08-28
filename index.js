const express = require("express");
const helmet = require('helmet');
const compression = require('compression');





const locationRoutes  = require('./routes/locationRoutes');


const app = express();
app.use(helmet());
app.use(compression()); //Compress all routes
const PORT = process.env.PORT || 5000;

app.use("/suggestions", locationRoutes);
app.get("/", (req, res) => res.send("Welcome to the location API!"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
