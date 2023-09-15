const User = require('../models/userModel')
const gerateToken = require('../utils/gentateToken')
const AsyncHandler = require('express-async-handler')
const verifyToken = require('../utils/veifyToken')

// controller actions


module.exports.signup_post = async (req, res) => {
  const {name,email,password}= req.body;
  try {
    //Check if email exists
     const adminFound = await User.findOne({email});
     if(adminFound){
       res.json('Admin Exists')
     }
    //register new user
    const user = await User.create({
     name,email,password
    });
    res.status(201).json({
      status: 'success',
      data: user

    })
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message
    })
  }
}


module.exports.login_post = AsyncHandler( async (req, res) => {
  const {email,password}= req.body;
  
     //find user 
     const user = await User.findOne({email})
     if(!user){
        return res.json({message:"User not found"})
     }
     if(user && user.verifyPassword(password)){
       const token = gerateToken(user._id)
         const verify = verifyToken(token)
          console.log(verify);
       return res.json({data: gerateToken(user._id),user,verify})
     } else{
              return res.json({message:"invalid login"})
  }
})
