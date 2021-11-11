var express = require('express')
const TemplateModel= require('./../model/CampainTemplate')
var router = express.Router();
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

router.get('/',(req,res)=>{
    console.log(req.body);
    const user = new TemplateModel(req.body)
    try {
         user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
})
module.exports =router;