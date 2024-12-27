const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["folder", "file"],
    required: true,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Files",
    default: null,
    validate:{
      validator:function(value){
        if(this.type === "folder" && value !== null){
          return false;
        }
        return true;
      },
      message : "Folders cannot have a parent folder",
    }
  },
 
  createdAt:{
    type:Date,
    default:Date.now
  }
});


const Files = mongoose.model("Files",fileSchema);

module.exports = Files;