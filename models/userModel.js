const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength:6
  },
  role: {
    type: String,
    default: "admin"
  }
})

userSchema.pre('save', async function (next) {
  try {
    if(!this.isModified("password")){
      next();
    }
    const salt = await bcrypt.genSalt(10)
    const hashedpassowrd = await bcrypt.hash(this.password, salt)
    this.password = hashedpassowrd
    console.log(hashedpassowrd)
    next()
  } catch (err) {
    next(err)
  }
})

userSchema.methods.verifyPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}





const User = mongoose.model('User', userSchema);
module.exports = User;
