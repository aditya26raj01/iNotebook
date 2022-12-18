const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var JWT = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "harryisagoodb$oy";


// ROUTE 1

// Create a User using: POST "/api/auth/createuser" Doesnt Require Auth

router.post("/signup", [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password must be of 5 characters").isLength({ min: 5 })
], async (req, res) => {
    var success = true;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false;
            return res.status(400).json({ success: success, error: "Sorry a user with this email already exists!" })
        }
        const salt = await bcrypt.genSalt(10)
        const securedPassword = await bcrypt.hash(req.body.password, salt)
        // Create a New User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = JWT.sign(data, JWT_SECRET)
        res.json({ success: success, authToken: authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error Occured!")
    }
})


// ROUTE 2

// Logging a User using: POST "/api/auth/login" No Require Auth

router.post("/login", [
    body("password", "Password cannot be blank").exists(),
    body("email", "Enter a Valid Email").isEmail()
], async (req, res) => {
    var success = false;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: success, error: "PLease try to login with correct credential" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success: success, error: "PLease try to login with correct credential" })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = JWT.sign(payload, JWT_SECRET)
        success = true;
        res.json({ success: success, authToken: authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error Occured!")
    }
})


// ROUTE 3

// Get Logged in User using: POST "/api/auth/getuser" Require Auth

router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error Occured!")
    }
})

module.exports = router