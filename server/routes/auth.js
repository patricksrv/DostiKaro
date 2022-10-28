const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

// User try to access protected resource then how user use token
// For verify the token user have, we use middleware
// router.get('/protected',requireLogin, (req,res)=>{
//     // This  is protected resourse, user should be able to get this resource only when user logged in, user should have a token
//     res.send('hello user')
// })

router.post('/signup',(req,res)=>{
    const {name, email,password} = req.body
    if(!name || !email || !password){
        return res.status(422).json({error: "Please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error: "User already exist with same email"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
    
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            // If we didn't get the user, then email will be invalid
            return res.status(422).json({error:"Invalid Email or Password"})
        }
        // If we got the user with email then after we have to compare the password
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
                // we will generate token on the basis of user id here assigned as _id, and access id of the user from saveduser
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                const {_id, name, email} = savedUser
                res.json({token:token, user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        })
        .catch(err=>{
            // This error produce from our side
            console.log(err)
        })
    })
})
module.exports = router