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
            placeholder:{
                type:String,
                required:true,
            }
        }
    ],
    parentFile:{
        type:mongoose.Schema.ObjectId,
        ref:"Files",
        required:true,
    },
    creator:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    }

},{timestamps:true});


const Form = mongoose.model("Form",formSchema);

module.exports = Form; 