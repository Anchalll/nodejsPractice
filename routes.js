const express = require("express")
const {AllowLoggedInUserOnly,allowedRoles} = require("./middlewares/authenticationMiddleware")

const router = express.Router();

const {handleGenerateShortUrl,
    handleRedirectToUrl,
    handleGetAnalytics,
    handleHomePage, 
    handleGetSignUp,
    handlePostSignUp,
    handleGetLogin,
    handlePostLogin,
    handleGetAnalyticsAdmin} = require("./controllers/UrlController")

router.route("/home").post(AllowLoggedInUserOnly,handleGenerateShortUrl).get(AllowLoggedInUserOnly,handleHomePage)
router.get("/shorturl/:shortId",AllowLoggedInUserOnly, handleRedirectToUrl)
router.get("/getAnalytics",AllowLoggedInUserOnly, handleGetAnalytics)
router.get("/admin/getAnalytics",AllowLoggedInUserOnly, allowedRoles(["ADMIN"]),handleGetAnalyticsAdmin)
router.route("/signUp").post(handlePostSignUp).get(handleGetSignUp)
router.route("/").get(handleGetLogin).post(handlePostLogin)

module.exports = router;