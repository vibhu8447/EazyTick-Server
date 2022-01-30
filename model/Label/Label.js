const mongoose = require("mongoose");

const Label = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    contacts:{
        type:Array,
      default:[]
    },
    color:
    {
        type:String,
        default:"#ffffff"
    }
});

module.exports= mongoose.model("label", Label);
