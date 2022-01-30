const mongoose = require("mongoose");

const Scheduler = new mongoose.Schema({
   
    name:{
        type:String,
        required :true
    },
    img_src:{
      type:String,
    },
    user_mobile:{
        type:String,
        required:true
    },
    chat_id:{
        type:String,
        required:true
    },
    customer_mobile:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    scheduled_file_name:{
        type:String,
        default:null
    },
    scheduled_file:{
        type:String,
        default:null
    },
    time:{
        type:String
    },
    repeatTime:{
        type:String
    },
    status:{
        type:String,
        required:true
    }
},{timestamps: true});

module.exports= mongoose.model("scheduler", Scheduler);
