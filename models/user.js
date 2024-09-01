const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true,
        default:"NORMAL"
    }
})

const USER = mongoose.model("user",UserSchema)

module.exports = {USER}