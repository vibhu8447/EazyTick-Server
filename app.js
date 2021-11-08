const express = require('express');
const mongoose =require('mongoose');
const userModel = require("./model/user");
const PriceList= require('./Routes/PricingList');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = "mongodb+srv://vibhu8447:vibhu@cluster0.elndm.mongodb.net/LEARN1?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true})
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));
app.use('/pricelist',PriceList);
app.get('/',(req,res)=>{
  res.send("hello vibhu!!");
})
  app.post("/add", (request, response) => {
    console.log(request.body);
    const user = new userModel(request.body);
  
    try {
       user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});
app.listen(3000,()=>{
console.log("listening to 3000");
})