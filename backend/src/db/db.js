const mongoose = require('mongoose');

async function connectDB() {
    try{
<<<<<<< HEAD
    await mongoose.connect('');
=======
    await mongoose.connect(process.env.MONGO_URI);
>>>>>>> 7739497 (Remove database credientls)
    
    console.log("DataBase connected successfully");

    }catch(err){
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        console.error("Stack Trace:\n", err.stack);
    }
}

module.exports = connectDB
