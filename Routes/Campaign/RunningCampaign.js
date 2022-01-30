var express = require('express');
const RunningCampaignModel = require('./../../model/Campains/RunningCampaign');
var router = express.Router();
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

// to get all running campaign data
router.get("/all",(req,res)=>{    
    RunningCampaignModel.find({}).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(404).send(err);
    }) 
 })

// to create new running campaing data
router.post('/',(req,res)=>{
    console.log(req.body);
    const user = new RunningCampaignModel(req.body)
    try {
         user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
})

module.exports =router;