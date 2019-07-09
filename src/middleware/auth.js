var jwt = require('jsonwebtoken');
const userModel = require(
    './../models/user'
);
const auth=async (req,res,next)=>{
    try{
    console.log("token:",req.header('Authorization'));
    const  token=req.header('Authorization').replace("Bearer ",'');
    console.log("request token u",token);
    console.log("request token",JSON.parse(JSON.stringify(token)));
    const decoded=jwt.verify(JSON.parse(JSON.stringify(token)),'abcdefgh');
    console.log("decoded value",decoded);
    const user =await userModel.findOne({ _id:decoded._id,'tokens.token':JSON.parse(JSON.stringify(token))})
    console.log(user);
    if(!user){
        throw new Error();
    }
    req.user=user;
    req.token=token;
    next();
    }
 
        catch (e) {
            console.log("error",e)
            console.log("eagain",e.message)
            res.status(401).send('Invalid credentials')
    
}
}
module.exports=auth;
          
        