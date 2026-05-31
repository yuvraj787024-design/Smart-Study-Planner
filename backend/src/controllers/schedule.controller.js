const scheduleModel = require('../models/schedule.model');
const responseModel = require('../models/aiResponse.model');
const generatePlan = require('../utils/generatePlan');
async function scheduleRequest(req,res){
    try{
        const { examName, studyHours, examDate, subjects} = req.body

        //Store Request Date 
        const plan = await scheduleModel.create({
            user : req.user._id,
            examName,
            examDate,
            studyHours,
            subjects
        })

        const aiResponse = await generatePlan({
    examName,
    studyHours,
    examDate,
    subjects
});

        //Save AI Response 
        await responseModel.create({
            user:req.user._id,
            planId: plan._id,
            schedule: aiResponse
        })

        //Send message

        return res.status(201).json({
            plan,
            aiResponse
        })



    }catch(err){
        console.log("FULL ERROR:", err);   // 👈 ADD THIS
    return res.status(500).json({
        message:"Error in generating Plan",
        error: err.message   // 👈 ADD THIS
        })
    }
}

module.exports = {scheduleRequest}