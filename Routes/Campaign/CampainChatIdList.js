var express = require('express')
var mongoose = require('mongoose');
const ChatidListModel= require('./../../model/Campains/CampainChatidList');
var router = express.Router();
router.use(function timeLog (req, res, next) {
    console.log("Campaign Chatid list");
    console.log('Time: ', Date.now())
    next()
  })

//  To Create new Chatidlist 
function validate(object)
{
    if(object.system && object.name)
    return true;
    else
    return false;

}
router.post('/',(req,res)=>{
    console.log(req.body);
    if(!validate(req.body))
    {
        res.status(422).send({
            status:false,
            error:"Something Missing"
        });
    }
    else
    {

    const user = new ChatidListModel(req.body)
    try {
         user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
}
})

//  To get all chatidlist
router.get('/:system/all',(req,res)=>{
    console.log(req.params.system);
    ChatidListModel.find({}).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(404).send(err);
    }) 
 })


//  To get chatidlist by Id
router.get("/:id",(req,res)=>{
    ChatidListModel.find({_id:`${req.params.id}`}).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(404).send(err);
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