const { verifyUserToken } = require("../Services/auth");

async function AllowLoggedInUserOnly(req,res,next) {
    const id = req.headers["authorization"];
    console.log(id);
    const token = id.split("Bearer ")[1];
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