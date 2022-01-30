var express = require('express');
const LabelModel = require('./../../model/Label/Label');
var router = express.Router();
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

  router.post('/:id',(req,res)=>{
    console.log(req.body);
    const user = new LabelModel(req.body)
    try {
         user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }

    res.send("hi vibhu");
})

module.exports =router;