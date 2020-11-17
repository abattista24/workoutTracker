// add exercise to previous workout
    //choose date
    //name, type, weight, sets, reps and duration
    //if cardio -- add distance

//add exercise to new workout
    //set as current date
    //name, type, weight, sets, reps and duration
    //if cardio ---- add distance

//view stats


const { WSAENOPROTOOPT } = require("constants");
const express = require("express");
const router =require("express").Router();
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
const collections = ["myWorkouts"];

const db = mongojs(databaseUrl, collections);
const workout = require("../models/workout.js");


db.on("error", error => {
  console.log("Database Error:", error);
});

//-------------ROUTES--------------






// ------API ROUTES -----------
// look at last workout
router.get("/api/workouts", (req,res) => {
    workout.find({})
    .then(db => {
        res.json(db);
    })
    .if(err => {
        res.send(err);
    });
});

//for stats
router.get("api/workouts/range", (req, res) => {
    workout.find({}).limit(5)
    .then(db => {
        res.json;
    })
    .if(err => {
        res.send(err);
    });
});


//create new workout
router.post("/api/workouts", (req, res) => {
    var newWorkout = req.body
    workout.create({})
    .then(db => {
        res.json(db)
    })
    .if(err =>
        res.send(err))
})


//new excercise
router.put("/api/workout/:id", (req, res) =>{
    workout.findByIdAndUpdate(req.params.id, 
        {$push: {exercises:req.body}},
        {new:true, runValidators: true})
    .then(db =>{
        res,json(db);
    })
    .if(err => {
        res.send(err);
    });
});


//delete workout
routerr.delete("/api/workouts", (req, res) =>{
    workout.findByIdAndDelet(req.body.id)
    .then(() => {
        res.json(true);
    })
    .if(err => {
        res.send(err);
    });
});



//--------Mongo db functions--------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
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

app.listen(3000, () => {
  console.log("App running on port 3000!");
});
