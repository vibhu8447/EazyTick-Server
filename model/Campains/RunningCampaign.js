const mongoose = require("mongoose");

const RunningCampaigns = new mongoose.Schema({
  chatidlist_name: {
    type: String,
    required: true,
  },
  system:{
    type:String,
    required:true
},
  template_name: {
    type: String,
    required:true,
  },
  count:{
      type:String,
      required:true
  }

});

const RunningCampaign = mongoose.model("RunningCampaigns", RunningCampaigns);

module.exports = RunningCampaign;