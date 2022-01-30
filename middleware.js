
const validateuser =(req,res,next)=>{
    console.log("middle ware",req.body);
    if(req.body.name && req.body.system)
    {
        next();
    }
    else{
        res.status(203).json({status:false,message:"invalid data!!"});
    }
}

module.exports=validateuser;