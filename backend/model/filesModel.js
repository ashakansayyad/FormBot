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
  },
  files: [
    {
      name: {
        type: String,
        required: true,
      },
      creator: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  subFolders: [
    {
      name: {
        type: String,
        required: true,
      },
      subfiles: [
        {
          name: {
            type: String,
            required: true,
          }, 
          creator: {
            type: String,
            required: true,
          }, 
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  createdAt:{
    type:Date,
    default:Date.now
  }
});


const Files = mongoose.model("Files",fileSchema);

module.exports = Files;