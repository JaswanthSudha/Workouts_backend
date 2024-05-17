require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const workouts = require("./routes/workout")
const userRoutes = require("./routes/userRoute")

const app = express()
//connect to db
//this is an asynchronous funciton so it takes time to complete so we use then which will execute a function after the connections is connected
mongoose.connect(process.env.STRING)
    .then(() => {
        //listen to the requests 
        //this will only listen to the requests after the connection is establised
        app.listen(process.env.PORT, () => {
            console.log("Listening on port ", process.env.PORT);
        })

    })
    .catch((error) => {
        console.log("got error here");
        console.log(error);

    })
//middleware
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
})

//this middleware is used to acces the body data which contains in the req like while we are posting data we send data through request object and it's not good to send the data blodly using request object
app.use(express.json())
//routes
app.use("/api/workouts/", workouts);//this means use this workout only when the url contains /api/workouts
app.use("/api/user/", userRoutes)

//use nodemon to get the changes updated in the server without reruninng
//process is global and we should include the dotenv using require("dotenv").config()
//middleware will act between request and response whenever a req is sent first it goes to middlware and next should be written at the last to run the next middlware or anything