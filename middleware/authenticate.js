const jwt=require("jsonwebtoken");
const User =require("../model/userSchema")

const authenticate= async (req,res,next)=>{
    try{
    const token=req.cookies.jwt;
    // console.log(token);
    const verifyUser=jwt.verify(token,process.env.SECRET_KEY);
    // console.log(verifyUser);
    const user=await User.findOne({_id:verifyUser._id,"tokens.token":token})
    // console.log(user.name);
    if(!user){ throw new Error('User not Found') };
    req.token=token;
    req.user=user;
    req.userID=user._id
    next();
}catch(e){
    res.status(401).send('unauthorised:No token provided')
    res.status(401).send(e);
}
}


module.exports=authenticate;
