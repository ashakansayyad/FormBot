const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req,res,next)=>{

    // checks the authorization header to get the JWT token from client
    const token = req.headers.authorization;
    console.log("token: ",token);
    if(!token){
        return res.status(401).json({message:"user is not authorized!"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({message:"invalid token!"});
    }
}

module.exports = authMiddleware;