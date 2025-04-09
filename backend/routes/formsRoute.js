const express = require("express");
const router = express.Router();
const Form = require("../model/formModel")

const authMiddleware = require("../middleware/authMiddleware");


// create form
router.post("/create-form",authMiddleware,async(req,res)=>{
   
    const userId = req.user;
    try{
        
        const newForm = new Form({title,babbles,inputFields,parentFileId,creator:userId});
        await newForm.save();
        return res.status(201).json({message:"Form created successfully!",newForm});
    }catch(err){
        console.error("Err: ",err);
        res.status(400).json({message:"Error occure while creating form"});
    }
});

// get specefic form
router.get("/get-form/:parentFileId",async(req,res)=>{
    const parentFileId = req.params.parentFileId;
    
    try{
        const form = await Form.findOne({parentFileId});
        if(!form){
            return res.status(404).json({message:"Form not found"});
        }
        return res.status(200).json(form);
    }catch(err){
        console.error("Error: ",err);
        return res.status(400).json({message:"Error fetching form"});
    }
});

// update form
router.put("/update-form/:parentFileId",authMiddleware,async(req,res)=>{
    const parentFileId = req.params.parentFileId;
    const {title,babbles,inputFields} = req.body;
    const userId = req.user;
    try{
        const updatedForm = await Form.findOneAndUpdate({ parentFileId,creator:userId},{title,babbles,inputFields},{new:true});
        if(!updatedForm){
            return res.status(404).json({message:"Form not found or you are not authorized to update it"});
        }
        return res.status(200).json({message:"Form updated successfully!",form:updatedForm})
    }catch(err){
        console.log("Err: ",err);
        res.status(400).json({message:"Error occured while updating form"});
    }
})


module.exports = router;