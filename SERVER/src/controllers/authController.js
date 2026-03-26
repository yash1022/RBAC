import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";


export const register = async(req,res)=>{
    try{

        const {name,email,password,role = "user"} = req.body;

        if (!["user", "admin"].includes(role)) {
            logger.warn("Registration blocked: invalid role", { role });
            return res.status(400).json({ message: "Invalid role" });
        }

        const isExists = await user.findOne({ email });

        if(isExists)
        {
            logger.warn("Registration blocked: user already exists", { email });
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new user({
            name,
            email,
            password:hashedPassword,
            role,
        });

        await newUser.save();

        logger.info("User registered", { userId: newUser._id, email });

        res.status(201).json({message:"User registered successfully"});

    }
    catch(err)
    {
        logger.error("Registration failed", { error: err.message, stack: err.stack });
        res.status(500).json({message:"Server error"});
    }
};

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if (!email || !password) {
            logger.warn("Login validation failed: missing credentials");
            return res.status(400).json({ message: "Email and password are required" });
        }

        if (!process.env.JWT_SECRET) {
            logger.error("Login failed: JWT secret missing");
            return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }

        const existingUser = await user.findOne({email});

        if(!existingUser)
        {
            logger.warn("Login failed: user not found", { email });
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isvalid = await bcrypt.compare(password,existingUser.password);

        if(!isvalid)
        {
            logger.warn("Login failed: invalid password", { userId: existingUser._id });
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token = jwt.sign({id:existingUser._id,role:existingUser.role},process.env.JWT_SECRET,{expiresIn:"1h"});

        logger.info("Login successful", { userId: existingUser._id, role: existingUser.role });
        

        res.cookie("token",token,{httpOnly:true}).json({
            message:"Login successful",
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
            },
        });

    }

    catch(err)
    {
        logger.error("Login failed", { error: err.message, stack: err.stack });
        res.status(500).json({message:"Server error"});
    }
};