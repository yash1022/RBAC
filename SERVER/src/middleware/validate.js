import { validationResult } from "express-validator";
import logger from "../utils/logger.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn("Request validation failed", {
      method: req.method,
      path: req.originalUrl,
      errors: errors.array(),
    });
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};