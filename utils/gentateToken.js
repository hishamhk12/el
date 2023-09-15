const jwt = require('jsonwebtoken');

const gerateToken = id =>{
  return jwt.sign({id},"anykey",{expiresIn:"1y"})
};

module.exports = gerateToken;

