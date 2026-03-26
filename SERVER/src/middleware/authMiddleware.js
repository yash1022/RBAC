import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const authMiddleware = (req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer ","");

    if(!token)
    {
        logger.warn("Authorization failed: missing token", { path: req.originalUrl });
        return res.status(401).json({message:"Unauthorized"});
    }

    try
    {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err)
    {
        logger.warn("Authorization failed: invalid token", { path: req.originalUrl, error: err.message });
        return res.status(401).json({message:"Invalid token"});
    }
};

export const roleMiddleware = (...roles)=>{
    const normalizedRoles = roles.flat();

    return (req,res,next)=>{
        if(!req.user)
        {
            logger.warn("Role check failed: missing user context", { path: req.originalUrl });
            return res.status(401).json({message:"Unauthorized"});
        }

        if(!normalizedRoles.includes(req.user.role))
        {
            logger.warn("Role check failed: forbidden", { path: req.originalUrl, role: req.user.role, requiredRoles: normalizedRoles });
            return res.status(403).json({message:"Forbidden"});
        }

        next();
    }
}