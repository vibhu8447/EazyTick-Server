require("dotenv").config();
const express = require('express');
const mongoose =require('mongoose');
const userModel = require("./model/user");
const PriceList= require('./Routes/PricingList');
const CampaignTemplate =require('./Routes/CampaignTemplate');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
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
  //  pricing page 
  app.use('/pricelist',PriceList);
  
  // Campaign Template
  app.use('/template',CampaignTemplate)
  app.get('/',(req,res)=>{
    res.send("hello vibhu!!!");
  })
  app.post("/add", (request, response) => {
    console.log(request.body);
    const user = new userModel(request.body)
  
    try {
         user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});
app.listen(port,()=>{
console.log(`listening to ${port}`);
})