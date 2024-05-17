const express = require("express")
const router = express.Router()
const requireAuth = require("../middleware/requireAuth")
const Workout = require("../models/workoutModel")
const { getWorkouts, getWorkOut, createWorkout, deleteWorkout, updateWorkOut } = require("../controlllers/workoutController")
// Get all the workouts
// router.use(requireAuth)
router.get('/', getWorkouts)
//Get a Single Workout
router.get("/:id", getWorkOut)
//Post a new Workout
router.post("/", createWorkout)
//Delete new Workout
router.delete("/:id", deleteWorkout)
//Update a new Workout
router.patch("/:id", updateWorkOut)
module.exports = router;