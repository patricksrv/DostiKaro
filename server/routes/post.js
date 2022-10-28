const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")

router.get('/allpost',requireLogin, (req,res)=>{
    // for all post just find with no condition
    Post.find()
    // without populate we just getting id, we populate here and showing name and id of user
    .populate("postedBy", "_id name")
    .then(posts=>{
        res.json({posts:posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost', requireLogin, (req,res)=>{
    const {title, body, pic} = req.body
    if(!title || !body || !pic){
        return res.status(422).json({error:"Please add all the fields"})
    }

    // we should not show the password in the post
    req.user.password = undefined
    // creating post
    const post  = new Post({
        title,
        body,
        photo:pic, 
        postedBy:req.user
    })

    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin, (req,res)=>{
    Post.find({postedBy:req.user._id})
    // without populate we just getting id, we populate here and showing name and id of user
    .populate("postedBy", "_id name")
    .then(mypost=>{
        res.json({mypost:mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router