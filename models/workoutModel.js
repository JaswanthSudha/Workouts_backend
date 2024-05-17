const mongoose = require("mongoose")
const Schema = mongoose.Schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model('Workout', workoutSchema)
//Workout is our model or collection which we use to do operations
//first object passed is how the schema should look alike
//second object passed will say about timestamp like when it created and when it is last updated