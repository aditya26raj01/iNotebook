const JWT = require("jsonwebtoken")

const JWT_SECRET = "harryisagoodb$oy"

const fetchUser = (req, res, next) => {
    // Get the user form the JWT Toen and add id to request object
    const token = req.header("auth-token")
    if (!token) {
        res.status(401).send({ error: "PLease authenticate using a valid token" })
    }
    try {
        const data = JWT.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({ error: "PLease authenticate using a valid token" })
    }
}

module.exports = fetchUser