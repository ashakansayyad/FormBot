const express = require("express");
const router = express.Router();
const Form = require("../model/formModel")
const authMiddleWare = require('../middleware/authMiddleware');


// create form
router.post("/create-form",async(req,res)=>{
    const {title,babbles,inputFields,parentFile} = req.body;
    const userId = req.user;
    try{
        const newForm = new Form({title,babbles,inputFields,parentFile,creator:userId});
        await newForm.save();
        return res.status(201).json({message:"Form created successfully!"});
    }catch(err){
        console.err("Err: ",err);
        res.status(400).json({message:"Error occure while creating form"});
    }
});

// get form
router.get("/get-form/:id",async(req,res)=>{
    const {id} = req.params.id;
    try{
        const form = await Form.findById({id});
        if(!form){
            return res.status(404).json({message:"Form not found"});
        }
        return res.status(200).json(form);
    }catch(err){
        console.error("Error: ",err);
        return res.status(400).json({message:"Error fetching form"});
    }
});



module.export = router;