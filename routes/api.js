const router =require("express").Router();
const databaseUrl = "fitnessTracker";
const collections = ["workout"];

// ------API ROUTES -----------
// look at last workout
app.get("/api/workout", (req,res) => {
    db.workout.find({})
    .then(data => {
        res.json(data);
    })
    .if(err => {
        res.send(err);
    });
});

//for stats
app.get("api/workout/range", (req, res) => {
    db.workout.find({}).limit(5)
    .then(db => {
        res.json;
    })
    .if(err => {
        res.send(err);
    });
});


//create new workout
app.post("/api/workout", (req, res) => {
    db.workout.create(req.body)
    .then(data => {
        res.json(data)
    })
    .if(err =>
        res.send(err))
})


//new excercise
app.put("/api/workout/:id", (req, res) =>{
    db.workout.findOneAndUpdate(req.params.id, req.body)
    .then(data =>{
        res.json(data);
    })
    .if(err => {
        res.send(err);
    })
});


//delete workout
app.delete("/api/workout", (req, res) =>{
    workout.findByIdAndDelet(req.body.id)
    .then(() => {
        res.json();
    })
    .if(err => {
        res.send(err);
    });
});

module.exports= api;