const registerModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const tokenBlackListModel = require("../models/blackList.model");
const emailService = require("../services/email.service")

async function registerUser(req,res){
    try{
    const { name, email ,password } = req.body;
    const isUserAlreadyExist = await registerModel.findOne({
        $or:[
            {name},
            {email}
        ]
        //email:email
    })
    if(isUserAlreadyExist){
       return res.status(409).json({
            message:"User already exist"
        })
    }

     const hash = await bcrypt.hash(password,10)

    const user = await registerModel.create({
        name, 
        email, 
        password:hash
    })
    const token = jwt.sign({
        id:user._id,  
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    await emailService.sendRegistrationEmail(user.email, user.name)
     console.log("JWT_SECRET:", process.env.JWT_SECRET)

    return res.status(201).json({
        message: "Registeres Successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    })
   

    
}catch(err){
    console.log("ERROR:", err);
    console.log("JWT_SECRET:", process.env.JWT_SECRET)
        return res.status(500).json({
            message: "Server error"
})

}
}

async function loginUser(req,res) {
    const {name, email ,password }= req.body

    const user = await registerModel.findOne({
        $or:[
            {name},
            {email}
        ]
    })
    if(!user){
        return res.status(409).json({
            message:"Invalid credirntls"
        })
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password)
    if(!isPasswordvalid){
        return res.status(409).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,
    { expiresIn: "1d" });

    res.cookie("token", token)
    
    res.status(200).json({
        message:"User logged in successfully",
        token: token,
        user:{
            id:user._id,
            name: user.name,
            email:user.email
        }
    })
}


async function getUsers(req, res){
    try {
        const users = await registerModel.find().select("-password");

        return res.status(200).json({
            message: "Users fetched successfully",
            users
        });

    } catch (err) {
        console.log("ERROR:", err);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

async function userLogout(req, res) {
   try {
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

      if (!token) {
         return res.status(200).json({
            message: "User logged out successfully"
         });
      }

      console.log("TOKEN:", token);

      await tokenBlackListModel.create({ token });

      res.clearCookie("token");

      return res.status(200).json({
         message: "User logged out successfully"
      });

   } catch (err) {
      console.log("LOGOUT ERROR:", err);
      return res.status(500).json({
         message: "Logout failed",
         error: err.message
      });
   }
}

module.exports = {registerUser ,loginUser , getUsers , userLogout}