const express = require('express');
const router = express.Router();
require('../db/conn'); //connection
const User = require('../model/userSchema');
const Data = require('../model/postSchema');
const Info = require('../model/infoSchema');
// const bcrypt=require('bcrypt');
// const jwt=require('jsonwebtoken');
// const authenticate=require("../middleware/authenticate")
// const cookieParser=require("cookie-parser")

// router.use(cookieParser());
// Contact
router.post('/contactus', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    console.log(req.body)
    try {
        if (!name || !email || !phone || !subject || !message) {
            return res.status(422).json({ error: "Please fill the field properly" })
        }
        try {
            const userExist = await User.findOne({ email: email })
            if (userExist) {
                return res.status(201).json({ message: "We already got message" });
            }
            const user = new User(req.body);
            await user.save();
            res.status(201).json({ message: "sent successfully" });
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
});
// getting post
router.get('/post', async (req, res) => {
    // res.status(201).json({message:"sent successfully"});

    Data.find({}, function (err, datas) {
        if (err) {
            res.send("something went wrong")
            next();
        }
        res.json(datas)
    });
});

router.get('/post/:id', async (req, res) => {
    Data.findById(req.params.id)
        .then(doc => {
            if (!doc) { return res.status(404).end(); }
            // res.cookie("data",JSON.stringify(doc),{
            //     expires:new Date(Date.now()+258920000),httpOnly:true
            // });
            return res.status(200).json(doc)
        })
        .catch(err => next(err));
});

// feed post
router.post('/postdata', async (req, res) => {
    const { name, age, type, date, loc, id, head, desc, img } = req.body;
    // console.log(req.body)
    try {
        if (!name || !age || !type || !date || !loc || !id || !head || !desc || !img) {
            return res.status(422).json({ error: "Please fill the field properly" })
        }
        try {
            // const userExist= await User.findOne({email:email})
            // if(userExist){
            //     return res.status(201).json({message:"We already got message"});
            //     }
            const data = new Data(req.body);
            await data.save();
            res.status(201).json({ message: "sent successfully" });
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
});
// info
router.get('/getinfo', async (req, res) => {
    // res.status(201).json({message:"sent successfully"});

    Info.find({}, function (err, datas) {
        if (err) {
            res.send("something went wrong")
            next();
        }
        res.json(datas)
    });
});
router.put('/info', async (req, res) => {
    const { cp, cw } = req.body;
    console.log(req.body)
    try {
        if (!cp || !cw) {
            return res.status(422).json({ error: "No proper data" })
        }
        Info.findByIdAndUpdate("63c91277812da6040c1dd161",{$set : { cp:cp,cw:cw}},
            (err, updatedObj) => {
                if (err) {
                    res.status(422).json({ status: false, error: "Item not updated" });
                }
                else {
                    res.status(200).json({ updatedObj });
                }
            })
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;