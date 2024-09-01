const { verifyUserToken } = require("../Services/auth");

//authentication
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

//Authorization 
function allowedRoles(roles) {
    return function(req,res, next){
        if(!roles.includes(req.current_user.role)){
            console.log(req.current_user)
            return res.end("UnAuthorized user")
        }
        return next();
    }
}

module.exports = {AllowLoggedInUserOnly,allowedRoles}