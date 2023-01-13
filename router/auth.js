const express=require('express');
const router=express.Router();
require('../db/conn'); //connection
const User=require('../model/userSchema'); 
const Data=require('../model/postSchema'); 
// const bcrypt=require('bcrypt');
// const jwt=require('jsonwebtoken');
// const authenticate=require("../middleware/authenticate")
// const cookieParser=require("cookie-parser")

// router.use(cookieParser());

router.post('/contactus',async(req,res)=>{
    const {name,email,phone,subject,message}=req.body;
    console.log(req.body)
    try{
    if(!name|| !email|| !phone|| !subject|| !message){
        return res.status(422).json({error:"Please fill the field properly"})
    }
    try{
        const userExist= await User.findOne({email:email})
        if(userExist){
            return res.status(201).json({message:"We already got message"});
            }
        const user=new User(req.body);
        await user.save();
        res.status(201).json({message:"sent successfully"});
    }catch(err){
        console.log(err);
    }
}catch(err){
    console.log(err);
}
});

router.get('/post',async(req,res)=>{
    // res.status(201).json({message:"sent successfully"});
   
        Data.find({},function(err,datas){
            if(err){
                res.send("something went wrong")
                next();
            }
            res.json(datas)
        });
});

router.get('/post/:id',async(req,res)=>{
        Data.findById(req.params.id)
        .then(doc=>{
            if(!doc){ return res.status(404).end();  }
            // res.cookie("data",JSON.stringify(doc),{
            //     expires:new Date(Date.now()+258920000),httpOnly:true
            // });
            return res.status(200).json(doc)
        })
        .catch(err=> next(err));
});


router.post('/postdata',async(req,res)=>{
    const {name,age,type,date,loc,id,head,desc,img}=req.body;
    // console.log(req.body)
    try{
    if(!name|| !age|| !type|| !date|| !loc|| !id|| !head|| !desc|| !img){
        return res.status(422).json({error:"Please fill the field properly"})
    }
    try{
        // const userExist= await User.findOne({email:email})
        // if(userExist){
        //     return res.status(201).json({message:"We already got message"});
        //     }
        const data=new Data(req.body);
        await data.save();
        res.status(201).json({message:"sent successfully"});
    }catch(err){
        console.log(err);
    }
}catch(err){
    console.log(err);
}
});
module.exports=router;