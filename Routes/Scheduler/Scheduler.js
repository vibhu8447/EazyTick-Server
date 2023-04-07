var express = require('express');
const SchedulerModel=require('./../../model/Scheduler/Scheduler');
var router = express.Router();
router.use(function timeLog (req, res, next) {
    console.log('Scheuler Time: ', Date.now())
    next()
  })

  // to create new schedule message 
router.post('/createCustomerSchedule', (req,res)=>{
    const user_mobile= req.query.user_mobile_No;
    const chat_id= req.query.chat_id;
    const customer_mobile= req.query.mobile;
    let time=req.query.dateTime;
    const name=req.query.name;
    const img_src=req.query.img_src;
    const message=req.query.message;
    const repeatTime=req.query.repeatTime;
    const status= req.query.status;
    time=time.substring(0,10)+"T"+time.substring(11,19)+".000Z";
    const schedulerMessage = new SchedulerModel({user_mobile,chat_id,customer_mobile,time,name,img_src,message,repeatTime,status})
  
    try {
        schedulerMessage.save();
      res.send({status:true,id:schedulerMessage._id});
    } catch (error) {
      res.status(500).send(error);
    }
    
  })

  // to get all scheduled message
router.get('/getCustomerSchedule?',(req,res)=>{
    const user_mobile=req.query.user_mobile_No
    SchedulerModel.find({user_mobile:user_mobile}).then((result)=>{
      res.status(200).send({"data":result});
    }).catch((err)=>{
        res.send(err);
    }) 
  })

  // to update scheduler message
router.put('/updateCustomerSchedule',async (req,res)=>{
    const id=req.query.scheduledMessageId;
    const status=req.query.status;
    const schedulerMessage=await SchedulerModel.findOne({_id:`${id}`});
    console.log(schedulerMessage.repeatTime);
    if(schedulerMessage.repeatTime=='0'){
      SchedulerModel.updateOne({_id:`${id}`},req.query)
      .then((result)=>{
          res.send({status:true,message:"status is changed"});
      })
      .catch((err)=>{
          res.status(401).send(err.message);
      })
    }
    else if(schedulerMessage.repeatTime!='0'){
      function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes*60000);}
      let d = new Date(schedulerMessage.time);
      d=addMinutes(d,parseInt(schedulerMessage.repeatTime));
      schedulerMessage.time=d.toISOString();
      schedulerMessage.save();
      res.send({status:true,message:"time is added"});
    }
  })

  // to delete schuler message 
router.delete('/deleteCustomerSchedule',(req,res)=>{
    const id=req.query.scheduledMessageId;
    SchedulerModel.deleteOne({_id:`${id}`})
    .then((result)=>{
        res.send({status:true});
    })
    .catch((err)=>{
        res.status(401).send(err.message);
    })
  })



module.exports =router;