import * as service from "../services/taskService.js";
import redis from "../config/redis.js";


export const createTaskController = async (req, res) => {

    const task = await service.createTaskService({
        ...req.body,
        userId: req.user.id,
    });

    await redis.del(`tasks_user_${req.user.id}`);

    res.status(201).json({message:"Task created successfully", task});
}

export const getTasksController = async (req, res) => {

    const cacheKey = `tasks_user_${req.user.id}`;
    const cachedTasks = await redis.get(cacheKey);

    if (cachedTasks) {
        return res.json({ tasks: JSON.parse(cachedTasks), source: "cache" });
    }

    const tasks = await service.getTasksService(req.user.id);
    await redis.setex(cacheKey, 3600, JSON.stringify(tasks)); // Cache for 1 hour

    res.json({ tasks, source: "database" });

}

export const getAllTasksController = async (req, res) => {

    const tasks = await service.getAllTasksService();
    res.json({ tasks });

}   

export const updateTaskController = async (req, res) => {

    const updatedTask = await service.updateTaskService(req.params.id, req.body);  
    if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
    }

    await redis.del(`tasks_user_${updatedTask.userId}`);

    res.json({ message: "Task updated successfully", task: updatedTask });
}

export const deleteTaskController = async (req, res) => {

    const deletedTask = await service.deleteTaskService(req.params.id, req.user.id);
    if (!deletedTask) {
        return res.status(404).json({ message: "Task not found or not authorized" });
    }

    await redis.del(`tasks_user_${deletedTask.userId}`);

    res.json({ message: "Task deleted successfully" });
}

export const deleteAnyTaskController = async (req, res) => {

    const deletedTask = await service.deleteAnyTaskService(req.params.id); 
    if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
    }

    await redis.del(`tasks_user_${deletedTask.userId}`);

    res.json({ message: " Admin deleted task successfully" });
}