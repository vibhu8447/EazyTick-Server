require("dotenv").config();
const cors=require('cors');
const express = require('express');
const mongoose =require('mongoose');
const userModel = require("./model/user");
const PriceList= require('./Routes/PricingList');
const CampaignTemplate =require('./Routes/Campaign/CampaignTemplate');
const ChatidList = require('./Routes/Campaign/CampainChatIdList');
const RunningCampaign= require('./Routes/Campaign/RunningCampaign');
const Scheduler = require('./Routes/Scheduler/Scheduler');
const Label= require('./Routes/Label/label');

const validateuser= require('./middleware');
const app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); // New

app.set('views', './src/views')
app.set('view engine', 'ejs')

var port =process.env.PORT||3000;

ConnectToDB();
function ConnectToDB(){   
   const uri = process.env.DB_CONNECTION_STRING;
    mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true})
     .then(() => console.log("Database connected!"))
     .catch(err => console.log(err));
}

  app.get("/",(req,res)=>{
    return "hi vibhu"
  });
  app.use('/scheduler',Scheduler);
  //  pricing page 
  app.use('/pricelist',PriceList);
  
  // Campaign Template
  app.use('/template',CampaignTemplate)
  
  // Campaign Template
  app.use('/chatidlist',ChatidList)
  
  // Running Campaign
  app.use('/runningcampaign',RunningCampaign)
  
  //  Labels
  app.use('/label',Label);

  app.get('/',(req,res)=>{
    res.send("Nothing here");
  })

  app.post("/add", validateuser, async (request, response) => {
    console.log(request.body);
    exits=  await userModel.findOne({system:request.body.system}) ;
      console.log(exits);
      if(exits)
      {
        response.status(200).send({status:true,message:"already Exits!! "});
      }
      else
      {
      const user = new userModel(request.body)
      try {
        user.save();
    response.send(user);
      } catch (error) {
        response.status(500).send(error);
      }
  }
});
app.listen(port,()=>{
console.log(`listening to ${port}`);
})