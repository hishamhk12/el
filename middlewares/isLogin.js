const veifyToken = require('../utils/veifyToken')
const User = require('../models/userModel')

const isLogin = async (req,res,next)=>{
//get token from header
 const headerObj = req.headers;
 const token = headerObj.authorization.split(" ")[1];

 //verify token
const verifedToken =  veifyToken(token);
  if (verifedToken){
    const admin = await User.findById(veifyToken.id)

 //save the admin into req.obj
 req.userAuth = admin;

 next();
  } else {
      const err = new Error('Token expired/invalid');
      next(err);
  }
}
module.exports = isLogin;