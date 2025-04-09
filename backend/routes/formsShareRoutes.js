const express = require("express");
const authMiddleWare = require("../middleware/authMiddleware");
const router = express.Router();
const dotenv = require("dotenv").config();
const Form = require("../model/formModel");



// generate the link for task form sharing
router.put("/:parentFileId",authMiddleWare,async(req,res)=>{
    const parentFileId = req.params.parentFileId;
    const userId = req.user;
    console.log("userID: ",userId) 
    try{
        const form = await Form.findOne({parentFileId});
        if(!form){
            return res.status(404).json({message:"Form not found"});
        }
        console.log("Form: ",form);
        if(form.creator.toString() !== userId){
            return res.status(401).json({ message: "You are not authorized to share this form !" });
        }
        const sharedLink = `${process.env.FRONTEND_URL}/formshare/shared/${form._id}`;
        return res.status(200).json(sharedLink);
    }catch(err){
        console.error("Error : ", err);
        return res.status(500).json({ message: "Server error" });
    }
});



// route to view shared task
router.get("/form-view/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const form = await Form.findById(id);
        if(!form){
            return res.status(404).json({ message: "form not available for sharing" });
        }
        return res.status(200).json(form);
    }catch(err){
        console.error("Error:", err);
        return res.status(500).json({ message: "Server error" });
    }
})


module.exports = router;