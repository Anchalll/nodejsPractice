const jwt = require('jsonwebtoken');

const secretKey = "123Anchal$$"
function GenerateUserToken(user) {
    var token = jwt.sign({_id:user._id,email:user.email}, secretKey);
    return token;
}

function verifyUserToken(token) {
    return jwt.verify(token, secretKey)    
}

module.exports = {
    GenerateUserToken,
    verifyUserToken
}