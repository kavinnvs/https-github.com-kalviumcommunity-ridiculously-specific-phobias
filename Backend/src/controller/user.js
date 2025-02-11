const {Router}= require("express");
const userModel = require("../Model/userModel");
const {upload}= require("../Middleware/multer");  
import bcrypt from "bcrypt"; 
const jwt = require("jsonwebtoken");
require("dotenv").config({path:'./src/Config/.env'});

const userrouter = Router();


userrouter.post("/create-user",upload.single("file"), async(req,res)=>{
    const {name, email, password} = req.body;
    const userEmail = await userModel.findOne({email});
    if (userEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const filename = req.file.filename ;
const fileUrl = path.join(filename);

    bcrypt.hash(password, 10, async function(err,hash){
        await userModel.create({
            name:name,
            email:email,
            password:hash,
            avatar: fileUrl, 
        })
    })


// const user={
//     name:name,
//     email:email,
//     password:password,
//     avatar: fileUrl,
// } ;
console.log(user);
});

userrouter.get("/get-user", async(req,res)=>{
    const {email, password} = req.body;
    const check = await userModel.findOne({email:email});
    if(!check){
        return res.status(400).json({
            message: "User not found",
        });
    }

    bcrypt.compare(password, check.password, function(err,result){
        if(err){
            return res.status(400).json({
                message: "Invalid bcrypt compare",
            });
        }
        if(result){

            jwt.sign({email:email}, xyz, (error, token)=>{
                if(error){
                    return res.status(400).json({
                        message: "Invalid jwt sign",
            });

            return res.status(200).json({
                message: "User logged in successfully",
            });
                }
            });
        } else {
            return res.status(400).json({
                message: "Invalid password"
            });
        }
    });
});

module.exports = userrouter;