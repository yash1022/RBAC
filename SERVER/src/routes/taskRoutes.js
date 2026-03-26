import express from "express";
import {
    createTaskController,
    getTasksController,
    getAllTasksController,
    updateTaskController,
    deleteTaskController,
    deleteAnyTaskController
} from "../controllers/taskController.js";
import { authMiddleware,roleMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["user", "admin"]), [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional().isString().withMessage("Description must be a string"),
], validate, createTaskController);

router.get("/", authMiddleware, roleMiddleware(["user", "admin"]), getTasksController);

router.get("/all", authMiddleware, roleMiddleware(["admin"]), getAllTasksController);

router.put("/:id", authMiddleware, roleMiddleware(["user", "admin"]), [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("description").optional().isString().withMessage("Description must be a string"),
    
], validate, updateTaskController);

router.delete("/:id", authMiddleware, roleMiddleware(["user", "admin"]), deleteTaskController);
router.delete("/admin/:id", authMiddleware, roleMiddleware(["admin"]), deleteAnyTaskController);

export default router;
