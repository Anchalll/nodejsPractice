const express = require("express")
const {AllowLoggedInUserOnly,allowedRoles} = require("./middlewares/authenticationMiddleware")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./profileImages");
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

var upload = multer({ storage });

const router = express.Router();

const {handleGenerateShortUrl,
    handleRedirectToUrl,
    handleGetAnalytics,
    handleHomePage, 
    handleGetSignUp,
    handlePostSignUp,
    handleGetLogin,
    handlePostLogin,
    handleGetAnalyticsAdmin,
    handleGetUploadFile,
    handlePostUploadFile} = require("./controllers/UrlController")

router.route("/home").post(AllowLoggedInUserOnly,handleGenerateShortUrl).get(AllowLoggedInUserOnly,handleHomePage)
router.get("/shorturl/:shortId",AllowLoggedInUserOnly, handleRedirectToUrl)
router.get("/getAnalytics",AllowLoggedInUserOnly, handleGetAnalytics)
router.get("/admin/getAnalytics",AllowLoggedInUserOnly, allowedRoles(["ADMIN"]),handleGetAnalyticsAdmin)
router.route("/signUp").post(handlePostSignUp).get(handleGetSignUp)
router.route("/uploadFile").post(upload.single("profileImage"),handlePostUploadFile).get(handleGetUploadFile)
router.route("/").get(handleGetLogin).post(handlePostLogin)

module.exports = router;