const dotenv=require("dotenv")
const mongoose=require('mongoose')
const express=require('express');
const app=express();
const cookieParser=require("cookie-parser")

dotenv.config({path: './config.env'}); // for hiding personal data using env

app.use(express.json());
const PORT=process.env.PORT || 8000;
app.use(cookieParser());

// we link router files to make our route easy
app.use(require('./router/auth'));

app.get('/contacts',(req,res)=>{
    res.send("Hello contact from server");
});

// app.get('/getdata',(req,res)=>{
//     console.log("hello")
//     res.status(201).json({message:"sent successfully"});
// });
if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
}

app.listen(PORT,()=>{
    console.log(`server running at port no ${PORT}`)
})


  // "proxy": "http://localhost:8000",