const express = require('express');
const router = new express.Router();
const userModel = require(
    './../models/user'
);
const auth=require('./../middleware/auth');
//sign up
router.post('/users', async (req, res) => {
    console.log(req.body);
    const user = new userModel(req.body)
    try {
        await user.save();
        const token = await user.getWebToken();
        res.status(201).send({
            user,
            token
        });
   } catch (error) {
        console.log("error:", error)
        res.status(400).send(error);
    }
})
//login
router.post('/users/login', async (req, res) => {
        try {
            const user = await userModel.findByCredentials(req.body.email, req.body.password);
            const token = await user.getWebToken();
            res.status(200).send({
                user,
                token
            });
        } catch (error) {
            console.log("error:", error)
            res.status(400).send(error);
        }
    }
)
//logout
router.get('/users/logout',auth, async function (req, res)  {
    try{
        console.log("users",req.user);
    req.user.tokens.filter((token)=>{
       return !(token.token===JSON.parse(JSON.stringify(req.token)));
    })
    await req.user.save();
    res.status(200).send();
}
catch(e){
    res.status(500).send();
}



    })
//profile based on token
router.get('/users/my',auth, async (req, res) => {
res.send(req.user)
})
//all users
router.get('/users', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send(users);

    } catch (error) {
        console.log("error:", error)
        res.status(500).send(error);
    }
})
//user based on Id
router.get('/users/:id', async (req, res) => {
    console.log("hey", req.params);

    const _id = req.params.id;
    try {
        const user = await userModel.findById({
            _id
        })
        if (!user) {
            return res.status(404).send();
        }
        console.log(user);
        res.status(200).send(user);
    } catch (error) {
        console.log("error:", error)
        res.status(500).send(error);
    }
})
//update User
router.patch('/users/:id', async (req, res) => {
    var reqKeys = Object.keys(req.body);
    console.log(reqKeys);
    var allowedKeys = ["age", "name", "email", "password"];
    var isAllowed = reqKeys.every((k) => {
        return allowedKeys.includes(k);
    })
    if (!isAllowed) {
        return res.status(400).send({
            "error": "InvalidUpdates"
        });
    }


    const _id = req.params.id;
    try {
        const user = await userModel.findById(_id);
        reqKeys.forEach((key) => user[key] = req.body[key]);
        await user.save();

        if (!user) {
            return res.status(404).send();
        }
        console.log(user);
        res.status(200).send(user);
    } catch (error) {
        console.log("error:", error)
        res.status(500).send(error);
    }
})
//delete user
router.delete('/users/:id', async (req, res) => {


    const _id = req.params.id;
    try {
        const user = await userModel.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send();
        }
        console.log(user);
        res.status(200).send(user);
    } catch (error) {
        console.log("error:", error)
        res.status(500).send(error);
    }
})
module.exports = router;