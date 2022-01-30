const mongoose = require("mongoose");

const Templates = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  system:{
    type:String,
    required:true
  },
  filename:{
    type:String,
    default:null
  },
  file:{
      type:String,
      default: null
  }

});

const Template = mongoose.model("Template", Templates);

module.exports = Template;