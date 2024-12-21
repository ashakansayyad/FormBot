const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors  = require("cors");
const dotenv = require("dotenv");
dotenv.config();


app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome to FormBot App Backend !!");
})

mongoose
.connect(process.env.MONGODB_URL)
.then(()=>console.log("MongoDB Connected Successfully!!"))
.catch((err)=>console.log("MongoDB Connection Error: ",err));



const PORT  = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
