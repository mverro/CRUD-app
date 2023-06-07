const jwt = require("jsonwebtoken");
const screetCode =  process.env.SECRET_CODE 


const tokenGenerator = (data) => {
  return jwt.sign({
    data
  },screetCode);
};

const tokenVerifier = (data) =>{
    return jwt.verify(data,screetCode)
}


module.exports = {
    tokenGenerator,tokenVerifier
}
