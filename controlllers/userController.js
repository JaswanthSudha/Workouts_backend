const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
//create token
const createToken = (_id) => {
    const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
    return token
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password)
        //create token
        const token = createToken(user._id)
        res.status(200).json({ email, token })

    }

    catch (error) {
        res.status(500).json({ error: error.message })
    }

}
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.signup(email, password)
        //generate token and send to browser
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    }
    catch (error) {
        res.status(500).json({ error: error.message })

    }
    // res.json("signup")
}
module.exports = { login, signup }