const mongoose = require('mongoose')
//const registerModel = require('./auth.model')


const responseSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"register"
    },
    planId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "schedule"
    },
    schedule:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const responseModel = mongoose.model("response",responseSchema)

module.exports = responseModel