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

});

const Template = mongoose.model("Template", Templates);

module.exports = Template;