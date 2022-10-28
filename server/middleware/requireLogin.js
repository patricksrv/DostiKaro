const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req, res, next)=>{
    const {authorization} = req.headers
    // authorization === Bearer gfghfgftrtdrtdetr5656

    // If authorization is not present
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    // to match the token
    jwt.verify(token, JWT_SECRET, (err, payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in"})
        }

        // if we didn't get any error
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
    })
}