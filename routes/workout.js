const express = require("express")
const router = express.Router()
const requireAuth = require("../middleware/requireAuth")
const Workout = require("../models/workoutModel")
const { getWorkouts, getWorkOut, createWorkout, deleteWorkout, updateWorkOut } = require("../controlllers/workoutController")
// Get all the workouts
// router.use(requireAuth)
router.get('/', requireAuth, getWorkouts)
//Get a Single Workout
router.get("/:id", requireAuth, getWorkOut)
//Post a new Workout
router.post("/", requireAuth, createWorkout)
//Delete new Workout
router.delete("/:id", deleteWorkout)
//Update a new Workout
router.patch("/:id", requireAuth, updateWorkOut)
module.exports = router;