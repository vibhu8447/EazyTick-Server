var express = require('express')
var mongoose = require('mongoose');
const ChatidListModel= require('./../model/CampainChatidList');
var router = express.Router();
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

  //  To Create new Chatidlist 
  router.post('/',(req,res)=>{
    console.log(req.body);
    const user = new ChatidListModel(req.body)
    try {
         user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
})

//  To get chatidlist by Id
router.get("/:id",(req,res)=>{
    ChatidListModel.find({_id:`${req.params.id}`}).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.send(err);
    }) 
 })


//  To get all chatidlist
  router.get("/all",(req,res)=>{
    ChatidListModel.find().then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.send(err);
    }) 
 })

// To Update ChatidList by id
 router.put("/:id",(req,res)=>{
    ChatidListModel.updateOne({_id:`${req.params.id}`},req.body)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.status(401).send(err);
    })
})

// to Delete  Template List By Id
router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    ChatidListModel.deleteOne({_id:req.params.id})
    .then((result)=>{
        res.status(200).send(result);
    })
    .catch((err)=>{
        res.status(404).send(err);
    })
})


 module.exports =router;