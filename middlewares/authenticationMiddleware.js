const { verifyUserToken } = require("../Services/auth");

async function AllowLoggedInUserOnly(req,res,next) {
    const token = req.cookies?.Id;
    if(!token){
        return res.redirect("/")
    }
    const current_user = verifyUserToken(token);
    if(!current_user){
        return res.redirect("/")
    }
    req.current_user = current_user;
    next()
}

module.exports = {AllowLoggedInUserOnly}