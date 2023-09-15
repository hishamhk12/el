const jwt = require("jsonwebtoken");
const verifyToken = token =>{
  return jwt.verify ( token,"anykey",(err,decode)=>{
    if (err){
      return false
    } else{
      return decode
    }
  })
}
module.exports = verifyToken;