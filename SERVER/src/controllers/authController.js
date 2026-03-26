import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async(req,res)=>{
    try{

        const {name,email,password} = req.body;

        const isExists = await user.findOne({ email });

        if(isExists)
        {
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new user({
            name,
            email,
            password:hashedPassword
        });

        await newUser.save();

        res.status(201).json({message:"User registered successfully"});

    }
    catch(err)
    {
        res.status(500).json({message:"Server error"});
    }
};

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }

        const existingUser = await user.findOne({email});

        if(!existingUser)
        {
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isvalid = await bcrypt.compare(password,existingUser.password);

        if(!isvalid)
        {
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token = jwt.sign({id:existingUser._id,role:existingUser.role},process.env.JWT_SECRET,{expiresIn:"1h"});
        

        res.cookie("token",token,{httpOnly:true}).json({message:"Login successful"});

    }

    catch(err)
    {
        res.status(500).json({message:"Server error"});
    }
};