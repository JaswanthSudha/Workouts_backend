const express = require("express")
const router = express.Router()
const requireAuth = require("../middleware/requireAuth")
const { signup, login } = require("../controlllers/userController")
router.post("/login", login)
router.post("/signup", signup)
module.exports = router