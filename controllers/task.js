const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const key = process.env.KEY;
const User = require("../models/user");
const Task = require("../models/task");




//multer



//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}


//protected routes
router.get("/check", checkToken, (req, res) => {
        jwt.verify(req.token, key, (err, authorizedData) => {
            if(err){
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                //If token is successfully verified, we can send the autorized data 
                res.json({
                    message: 'Successful retrieval',
                    data: authorizedData,
                });
            }
        })
})



router.post('/newTask/:id', checkToken, async (req, res) =>{
    
    console.log(req.body)
    // console.log(user)
    let user = await User.findById(req.params.id)
    console.log('user')
    let newPost = await Task.create({title: req.body.title, description: req.body.description, dueDate: req.body.dueDate, user: user})
    console.log("newPost")
    let updateUser = await User.findByIdAndUpdate(req.params.id, {$push: {posts: newPost}}, {new:true})
    console.log('updateUser')
    res.json(await User.findByIdAndUpdate(req.params.id, {$push: {tasks: newPost}}, {new:true}))
})

router.get('/getTasks/:id', checkToken, async (req, res) => {
    res.json( await Task.find({user: req.params.id}))
})

router.put('/updateTask/:id', checkToken, async (req, res) => {
    res.json(await Task.findByIdAndUpdate(req.params.id, req.body, {new: true}))
})

router.delete('/deleteOne/:id', checkToken, async (req, res) => {
    res.json( await Task.findByIdAndDelete(req.params.id) )
})

//reset/delte all
router.delete('/delete/all/use/less', async (req, res) => {
    res.json(await Task.deleteMany())
})


module.exports = router