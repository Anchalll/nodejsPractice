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
    }
})

const USER = mongoose.model("user",UserSchema)

module.exports = {USER}