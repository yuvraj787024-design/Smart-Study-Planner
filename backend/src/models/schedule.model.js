const mongoose = require("mongoose");
const registerModel = require("./auth.model");

const scheduleSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"register",
        required:true
    },

    examName:{
        type:String,
        required:true
    },
    studyHours:{
        type:Number,
        required:true
    },
    examDate:{
        type:Date,
        required:true
    },
    subjects:[{
        type:String
   }],
    createdAt:{
        type:Date,
        default: Date.now
    }


})

const scheduleModel =  mongoose.model("schedule",scheduleSchema);
module.exports = scheduleModel