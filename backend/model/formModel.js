const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    babbles:[
      {
        type:{
            type:String,
            required:true,

        },
        name:{
            type:String,
            required:true,
        },
        value:{
            type:String,
            required:true,
        }
      }
    ],
    inputFields:[
        {
            type:{
                type:String,
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            value:{
                type:String,               //required field only use for button
                required:false,
            }
        }
    ],
    parentFileId:{
        type:mongoose.Schema.ObjectId,
        ref:"Files",
        required:false,
    },
    creator:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:false,
    }

},{timestamps:true});


const Form = mongoose.model("Form",formSchema);

module.exports = Form; 