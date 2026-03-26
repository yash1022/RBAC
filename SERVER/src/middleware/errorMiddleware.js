import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next)=>{
    logger.error("Unhandled request error", {
        method: req.method,
        path: req.originalUrl,
        error: err.message,
        stack: err.stack,
    });
    res.status(500).json({message:err.message || "Server error"});
    
}