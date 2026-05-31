const mongoose = require('mongoose');

async function connectDB() {
    try{
    await mongoose.connect('mongodb+srv://yuvraj:fbmChofkFs4dIQk7@ytbackend.0qlosmq.mongodb.net/study_planner');
    
    console.log("DataBase connected successfully");

    }catch(err){
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        console.error("Stack Trace:\n", err.stack);
    }
}

module.exports = connectDB