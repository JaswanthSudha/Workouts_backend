const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const validator = require("validator")
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })
userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error("All Fields Are Mandatory")
    }
    if (!validator.isEmail(email)) {
        throw Error("Enter a Valid Email")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not Strong enough")
    }
    const exits = await this.findOne({ email })
    if (exits) {
        throw Error("Mail in use")

    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password: hashPassword })
    return user
}
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All Fields Are Mandatory")
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Invalid Email")

    }
    const checks = await bcrypt.compare(password, user.password)
    if (!checks) {
        throw Error("Invalid Password")
    }
    return user;
}
module.exports = mongoose.model("NinjaUser", userSchema)