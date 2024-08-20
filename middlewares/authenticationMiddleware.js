const { getUserFromSession } = require("../Services/auth");

async function AllowLoggedInUserOnly(req,res,next) {
    const id = req.cookies?.Id;
    if(!id){
        return res.redirect("/")
    }
    const current_user = getUserFromSession(id);
    if(!current_user){
        return res.redirect("/")
    }
    req.current_user = current_user;
    next()
}

module.exports = {AllowLoggedInUserOnly}