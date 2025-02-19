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
        if (type !== "folder" && type !== "file") {
            return res.status(400).json({ message: "Invalid type. Must be 'folder' or 'file'." });
          }
        
        if(type === "folder"){
          
            if(parentId){
                return res.status(400).json({message:"Folders cannot be created inside another folder"});
            }
            const alreadyExist = await Files.findOne({name});
            if(alreadyExist){
                return res.status(400).json({message:`The ${name} name already exist.Please provide different name`});
            }
              // create new folder
            const newFolder = new Files({
                name,
                type,
                creator:userId,
            });
            await newFolder.save();
            return res.status(201).json({message:"Folder Created Successfully!"})
        }
        
        if(type === 'file'){
              // Validate that parent is a folder
              if(parentId){
                const parent = await Files.findById(parentId);
                if(!parent || parent.type !== 'folder'){
                    return res.status(400).json({message:"Parent must be a folder"});
                }
              }
              const alreadyExist = await Files.findOne({name});
              if(alreadyExist){
                return res.status(400).json({message:`The ${name} name already exist.Please provide different name`});
            }
              //create standalone file or file inside folder
              const newFile = new Files({
                name,
                type,
                creator:userId,
                parentId:parentId || null   //inside a folder or standalone file 
              })
              await newFile.save();
              return res.status(201).json("File created successfully!");
        }
    }catch(err){
        console.error("Error occure in file creation: ",err);
       return res.status(400).json({message:"Internal server error"});
    }
});


//get all files and folders
router.get("/", authMiddleware, async (req, res) => {
  const { parentId } = req.query; // parentId to filter files inside the folder
  const userId = req.user;

  try {
    let files = [];
    let folders = [];

    if (parentId) {
      folders = await Files.find({
        creator: userId,
        parentId: null, // Standalone folders
        type: "folder",
      });

      // If a folder is selected, fetch its contents (files only)
      files = await Files.find({
        creator: userId,
        parentId: parentId,
        type: "file", // Get files inside the folder
      });
    } else {
      // If no folder is selected, fetch standalone folders and files
      folders = await Files.find({
        creator: userId,
        parentId: null, // Standalone folders
        type: "folder",
      });
      files = await Files.find({
        creator: userId,
        parentId: null, // Standalone files
        type: "file",
      });
    }

    // Merge standalone folders and files
    const allItems = [...folders, ...files];

    return res.status(200).json({ files: allItems });
  } catch (err) {
    console.error("Error occurred while fetching files and folders:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

  

//delete files or folders
router.delete("/:id",authMiddleware,async(req,res)=>{
    const {id} = req.params;
    const userId = req.user;
    try{
        // find the file or folder
        const item = await Files.findById(id);

        if(!item){
            return res.status(404).json({message:"File or folder not found"});
        }

        // check the user is creator or not 
        if(item.creator.toString() !== userId){
            return res.status(401).json({message:"you are not authorized to delete this item"})
        }
        if(item.type === "folder"){
            // delete all the files inside the folder (if available)
            await Files.deleteMany({parentId:id});

            // delete the folder itself
            await Files.findByIdAndDelete(id);

            return res.status(200).json({message:"Folder deleted successfully!"});

        }else if(item.type === "file"){
            // delete file
            await Files.findByIdAndDelete(id);
            return res.status(200).json({ message: "File deleted successfully." });
        }
    }catch(err){
        console.error("Error occurred while deleting file or folder:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
})


module.exports = router;