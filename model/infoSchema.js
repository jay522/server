const mongoose=require('mongoose');

const infoSchema=new mongoose.Schema({
    cp:{
        type:Number,
        required:true
    },
    cw:{
        type:Number,
        required:true
    }
    
})


const Info=mongoose.model('Info',infoSchema);
module.exports=Info;