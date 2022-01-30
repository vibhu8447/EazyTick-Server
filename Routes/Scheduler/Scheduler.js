var express = require('express');
const SchedulerModel=require('./../../model/Scheduler/Scheduler');
var router = express.Router();
router.use(function timeLog (req, res, next) {
    console.log('Scheuler Time: ', Date.now())
    next()
  })
  router.post('/createCustomerSchedule', (req,res)=>{
    const user_mobile= req.query.user_mobile_No;
    const chat_id= req.query.chat_id;
    const customer_mobile= req.query.mobile;
    const time=req.query.dateTime;
    const name=req.query.name;
    const img_src=req.query.img_src;
    const message=req.query.message;
    const repeatTime=req.query.repeatTime;
    const status= req.query.status;

    // console.log(id,user_mobile,chat_id,customer_mobile,time,name,img_src,message,repeatTime,status);
    const schedulerMessage = new SchedulerModel({user_mobile,chat_id,customer_mobile,time,name,img_src,message,repeatTime,status})
  
    try {
        schedulerMessage.save();
      res.send({status:true,id:schedulerMessage._id});
    } catch (error) {
      res.status(500).send(error);
    }
    
})

module.exports =router;