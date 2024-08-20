const {nanoid} = require("nanoid")
const {URL} = require("../models/url")
const {USER} = require("../models/user")
const { v4: uuidv4 } = require('uuid');
const {setUserToSession, getUserFromSession} = require("../Services/auth")

async function handleHomePage(req,res) {
    res.render('home')
}

async function handleGenerateShortUrl(req,res){
    const body = req.body;
    const shortID = nanoid(7);
    if(body.url !== null){
       await URL.create({
            shortId :shortID ,
            redirectUrl : body.url,
            visitHistory : [],
            createdBy: req.current_user._id
        })
        return res.render("home",{generatedUrl :shortID })
    }
    else{
        return res.status(400).json({error:"url required"})
    }
}

async function handleRedirectToUrl(req,res) {
    const shortId = await req.params.shortId;
    const doc = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push:{
            visitHistory:{timestamp:Date.now()}
        }
    });
    res.redirect(doc.redirectUrl)
}

async function handleGetAnalytics(req,res) {    
    const doc = await URL.find({createdBy:req.current_user._id})
    res.render("analyticsPage",{data : doc})
}

async function handleGetSignUp(req,res) {
    res.render("signUp.ejs")
}

async function handlePostSignUp(req,res) {
    console.log(req.body)
    const {username, email, password} = req.body;
    await USER.create({
        username,
        email,
        password
    })
    res.redirect("/")
}

async function handleGetLogin(req,res) {
    res.render("login.ejs")
}

async function handlePostLogin(req,res) {
    const {email, password} = req.body;
    const user = await USER.findOne({email, password})
    if(user){
      const sessionId = uuidv4();
      setUserToSession(sessionId,user)
      res.cookie("Id",sessionId);
      res.redirect("/home")
    }
    else{
        res.render("login.ejs", {error : "Invalid email / Password"})
    }

}

module.exports = {handleGenerateShortUrl,
    handleRedirectToUrl,
    handleGetAnalytics,
    handleHomePage,
    handleGetSignUp,
    handlePostSignUp,
    handlePostLogin,
    handleGetLogin};