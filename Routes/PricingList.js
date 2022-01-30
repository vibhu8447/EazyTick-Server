var express = require('express')
var router = express.Router();
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

router.get('/',(req,res)=>{
    res.send("Hello Wolrd");
})
module.exports =router;