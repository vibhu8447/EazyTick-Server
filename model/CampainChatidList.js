const mongoose= require('mongoose');

const ChatidLists= new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      contactList:{
          type:Array,
          default:[]
      }
    
})

const ChatidList = mongoose.model("ChatidLists", ChatidLists);

module.exports = ChatidList;