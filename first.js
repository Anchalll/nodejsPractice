const express = require("express")
const mongoose = require("mongoose");
const urlRoutes = require("./routes")
const path = require("path")
const cookieParser = require("cookie-parser")

const app = express();

mongoose.connect("mongodb://localhost:27017/ShortUrlDb")
.then(()=>console.log("connection with ShortUrlDb successful"))
.catch((err)=>console.log(err))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

app.use("/",urlRoutes)

app.listen(8000,()=>console.log("server started"))