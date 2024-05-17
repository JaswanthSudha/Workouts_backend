const mongoose = require("mongoose")
const Workout = require("../models/workoutModel")

//Get All the Documents
const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
}
//Get a Single Document
const getWorkOut = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Workout" });
    }
    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({ error: "No Such Workout" });

    }
    res.status(200).json(workout)
}
//create a new Workout
const createWorkout = async (req, res) => {
    const user_id = req.user._id;
    const { title, load, reps } = req.body;
    let emptyFlieds = []
    if (!title) {
        emptyFlieds.push("title");
    }
    if (!load) {
        emptyFlieds.push("load");
    }
    if (!reps) {
        emptyFlieds.push("reps");
    }
    if (emptyFlieds.length > 0) {
        return res.status(400).json({ error: "Please fill All the Fields", emptyFlieds });
    }
    try {
        const workout = await Workout.create({ title, load, reps, user_id });
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(400).json({ err: "Some Error" });
    }
}
//delete a workOut
const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No Such Workout" });
        }
        const workout = await Workout.findOneAndDelete({ _id: id });
        if (!workout) {
            return res.status(404).json({ error: "No Such Workout" });

        }
        res.status(200).json({ workout: workout })
    }
    catch (error) {
        res.json(error);

    }


}
//update a WorkOut
const updateWorkOut = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Workout" });
    }
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!workout) {
        return res.status(404).json({ error: "No Such Workout" });

    }
    res.status(200).json({ msg: "Updated", workout: workout })


}
module.exports = {
    getWorkOut,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkOut
}