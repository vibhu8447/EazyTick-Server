var express = require('express')
var mongoose = require('mongoose');
const TemplateModel= require('./../model/CampainTemplate')
var router = express.Router();
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

//  to create new Template
router.post('/',(req,res)=>{
    console.log(req.body);
    const user = new TemplateModel(req.body)
    try {
         user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
})
// to get all template list
router.get("/all",(req,res)=>{
   TemplateModel.find().then((result)=>{
       res.status(200).send(result);
   }).catch((err)=>{
       res.send(err);
   }) 
})

// to get Template list by id
router.get('/:id',(req,res)=>{
    TemplateModel.find({_id:'618da2f44f7416a10e13cd49'}).then((result)=>{
        res.status(200).send({data:result});
    })
    .catch((err)=>{
        res.status(404).send("not found!!")
    })
})

// to update template List By Id
router.put("/:id/",(req,res)=>{
    TemplateModel.updateOne({_id:`${req.params.id}`},req.body)
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
    TemplateModel.deleteOne({_id:req.params.id})
    .then((result)=>{
        res.status(200).send(result);
    })
    .catch((err)=>{
        res.status(404).send(err);
    })
})

module.exports =router;