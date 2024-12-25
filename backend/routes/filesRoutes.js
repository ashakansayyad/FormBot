const express = require("express");
const Files = require("../model/filesModel");
const authMiddleware =  require("../middleware/authMiddleware")
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();

// create folder or file
router.post("/",authMiddleware,async(req,res)=>{
    const { name, type, parentId } = req.body;
    const userId = req.user;
    try{
        if(type === "folder"){
            // create new folder
            const newFolder = new Files({
                name,
                type,
                creator:userId,
                parentId,
                files: [],
                subfolders: [],
            });
            await newFolder.save();
            return res.status(201).json({message:"Folder Created Successfully!"})
        }else if(type === 'files'){
              // Check if parentId is valid (only folders can have files)
              if(parentId){
                const parent = await Files.findById(parentId);
                if(!parent || !parent.type === 'folder'){
                    return res.status(400).json({message:"Parent must be a folder"});
                }
                // add file to the folder
                parent.files.push({name,creator:userId});
                await parent.save();
                return res.status(201).json({message:"File created successfully!"});
              }else{
                // create single standalone file
                const standaloneFile = new Files({name,type,creator:userId})
                await standaloneFile.save();
                return res.status(201).json("File Created Successfully!");
              }
        }
    }catch(err){
        console.error("Error occure in file creation: ",err);
       return res.status(400).json({message:"Internal server error"});
    }
});

