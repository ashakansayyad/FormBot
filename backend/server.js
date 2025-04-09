const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors  = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoutes");
const filesRoute = require("./routes/filesRoutes");
const shareRoute = require("./routes/shareRoutes");
const formRoute = require("./routes/formsRoute");
const formShareRoute = require("./routes/formsShareRoutes");
dotenv.config();


app.use(cors());
app.use(express.json()); //it parse the json data
app.use(bodyParser.urlencoded({extended:true})); //it also parse the form data
app.use("/api/user",userRoute);
app.use("/api/files",filesRoute);
app.use("/api/share",shareRoute);
app.use("/api/form",formRoute);
app.use("/api/formsahre",formShareRoute);



mongoose
.connect(process.env.MONGODB_URL)
.then(()=>console.log("MongoDB Connected Successfully!!"))
.catch((err)=>console.log("MongoDB Connection Error: ",err));

app.get("/",(req,res)=>{
    res.send("Welcome to FormBot App Backend !!");
})

const PORT  = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
