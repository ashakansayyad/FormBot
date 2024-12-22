const express = require("express");
const User = require("../model/userModel");
const authMiddleware =  require("../middleware/authMiddleware")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
const bcrypt = require("bcrypt");
dotenv.config();

//user registeration
router.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    try{
       const userExist = await User.findOne({email});
       if(userExist){
        res.status(400).json({message:"User Already Exist!"});
       }

    //hash password
    const hashedPassword = await bcrypt.hash(password,10);

    // create new user and save
    const newUser = new User({name,email,password:hashedPassword});
    await newUser.save();

    return res.status(201).json({message:"User Register Successfully!"});

    }catch(err){
        console.error("Error: ",err);
        return res.status(400).json({message:"user reagisteration failed!"});
    }
})


// get all users (without password)
router.get("/",async(req,res)=>{
    try{
        const allUsers = await User.find().select("-password -_v");
        if(!allUsers){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json(allUsers);
    }catch(err){
        return res.status(404).json({ message: "User data not found" });
    }
})

// get specefic user by id
router.get("/:id",authMiddleware,async(req,res)=>{
    const userId = req.params;
    try{
        const userById = await User.findById({userId}).select("-password -_v");
        if(!userById){
            return res.status(404).json({message:"user not found!"});
        }
        return res.status(200).json(userById);
    }catch(err){
        return res.status(404).json({ message: "User data not found" });
    }
})


//user login
router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        // check email is valid or not
        const isValid = await User.findOne({email});
        if(!isValid){
            return res.status(400).json({message:"wrong email or password!"});
        }
        // compare the input password with hashed password stored in db
        const isPasswordMatch = await bcrypt.compare(password,isValid.password);

        if(!isPasswordMatch){
            return res.status(400).json({message:"Wrong email or password"});
        }

        // generate JWT
        //create the payload contain the users id 
        const payload = {id : isValid._id};

        //  assign  the token using secret key
        const token = jwt.sign(payload,process.env.JWT_SECRET);

        return res.status(200).json({token});

    }catch(err){
        return res.status(400).json({message:"Something went wrong!"});
    }
})

module.exports = router;