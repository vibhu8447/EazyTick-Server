require("dotenv").config();
const express = require('express');
const mongoose =require('mongoose');
const userModel = require("./model/user");
const PriceList= require('./Routes/PricingList');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

// Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true})); // New
var port =process.env.PORT||3000;
const uri = process.env.DB_CONNECTION_STRING;
 mongoose
  .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true})
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

app.use('/pricelist',PriceList);
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