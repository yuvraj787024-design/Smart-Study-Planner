const mongoose = require('mongoose');


const registerSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const registerModel = mongoose.model("register",registerSchema);

module.exports = registerModel;