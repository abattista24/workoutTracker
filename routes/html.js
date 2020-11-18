const workout = require("../models/workout.js");
const router =require("express").Router();

app.get("/exercise", (req, res) => {
    res.sendFile(path.join (_dirname, "/public/excercise.html"));
});

app.get("/stats", (req,res) => {
    res.sendFile(path.join(_dirname, "/public/stats.html"));
});

module.exports =(app)