// add exercise to previous workout
    //choose date
    //name, type, weight, sets, reps and duration
    //if cardio -- add distance

//add exercise to new workout
    //set as current date
    //name, type, weight, sets, reps and duration
    //if cardio ---- add distance




// const { constants} = require("constants");
const express = require("express");
const { get } = require("http");
const mongojs = require("mongojs");
const mongoose = require("mongoose")
const logger = require("morgan");
const path = require("path");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "fitnessTracker";
const collections = ["workout"];

const db = mongojs(databaseUrl, collections);



db.on("error", error => {
  console.log("Database Error:", error);
});


app.get("/", (req, res) => {
  res.json(path.join(__dirname + "./public/index.html"));
});

app.post("/submit", (req, res) => {
  console.log(req.body);

  db.workouts.insert(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

app.get("/all", (req, res) => {
  db.workouts.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

app.get("/find/:id", (req, res) => {
  db.notes.findOne(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

app.post("/update/:id", (req, res) => {
  db.workouts.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      $set: {
        name: req.body.name,
        note: req.body.note,
        length:req.body.time,
        modified: Date.now()
      }
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  db.workouts.remove(
    {
      _id: mongojs.ObjectID(req.params.id)
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

app.delete("/clearall", (req, res) => {
  db.workouts.remove({}, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send(response);
    }
  });
});

var PORT = process.eventNames.PORT 
|| 3000;

app.listen(PORT, () => {
  console.log("App running on port" +PORT+ "!");
});
