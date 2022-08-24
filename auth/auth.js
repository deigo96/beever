const jwt = require('jsonwebtoken')
const pool = require("../db");


const protect = async (req, res, next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await pool.query("SELECT id, email FROM users WHERE id = $1", [decoded.id])

            next()
        } catch (error) {
            res.status(400).send({message:" Not Authorized"})
        }
    }

    if(!token){
        res.status(401).send({message: "No token"})
    }

}

module.exports = {protect}