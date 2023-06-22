const jwt = require("jsonwebtoken");
const getToken = (obj, value, exp) =>{

    const token = jwt.sign({ user_id: obj._id, value }, process.env.TOKEN_KEY, {
        expiresIn: exp,
      });
      return token
}

module.exports = getToken;
