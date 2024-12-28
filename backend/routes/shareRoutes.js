const express = require("express");
const Files = require("../model/filesModel");
const User = require("../model/userModel");
const authMiddleware = require("../middleware/authMiddleware");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();


// share by email
router.post("/email", authMiddleware, async (req, res) => {
  const { email, permission } = req.body;
  const userId = req.user;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user){
    return res.status(404).json({ message: "User not found" });
    }

    // update all files and folder  to share with the user
    await Files.updateMany(
        { creator: userId },
        { $addToSet: { sharedWith: { user: user._id, permission } } }
      );
  

    res.status(200).json({ message: "Dashboard shared successfully!" });

  } catch (err) {
    console.error("Error sharing dashboard by email:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// share by link
router.put("/link",authMiddleware,async(req,res)=>{
    const userId = req.user;
    const isPublic = req.body;
    try{
 // Update all files and folders to be public/private

        await Files.updateMany(
            {creator:userId},
            {isPublic}
        )
        if(isPublic){
            const link = `${process.env.FRONTEND_URL}/dashboard/share/${userId}`;
            res.status(200).json(link);
        }  else {
            res.status(200).json({ message: "Dashboard link disabled" });
          }
    }catch(err){
        console.error("Error sharing dashboard by link:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})

//fetch shared dashboared
router.get("/shared",authMiddleware,async(req,res)=>{
    const userId = req.user;
    try{
      const files = await Files.find({
        $or:[
          {creator:userId},
          {"sharedWith.user":userId},
          {isPublic:true},

        ],
      });
      res.status(200).json({files});
    }catch(err){
      console.error("Error retrieving shared dashboard: ",err);
      res.status(500).json({message:"Internal server error"});
    }
})


module.exports = router;