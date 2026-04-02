import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blacklist.model.js";



export const authUser = async (req, res, next) => {
    const token = req.cookies.token;
    
    if(!token){
        return res.status(400).json({
            message: "Token not provided"
        })
    };

    // check Token Blacklist 📀
    const tokenBlacklist = await tokenBlacklistModel.findOne({token});

    if(tokenBlacklist){
        return res.status(401).json({
            message: "Invalid token"
        })
    }


    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next()

    }catch(error){

        return res.status(401).json({
            message: "Invalid token"
        })
    }
    
};