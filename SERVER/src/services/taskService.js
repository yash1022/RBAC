import * as taskRepository from "../repositories/taskRepository.js";

export const createTaskService = (data)=>{
    return taskRepository.createTask(data);
}

export const getTasksService = (userId)=>{
    return taskRepository.getTasks(userId);
}

export const getAllTasksService = ()=>{
    return taskRepository.getAllTasks();
}

export const updateTaskService = (id,data)=>{
    return taskRepository.updateTask(id,data);
}

export const deleteTaskService = (id, userId) => {
    return taskRepository.deleteTask(id, userId);
};

export const deleteAnyTaskService = (id) => {
    return taskRepository.deleteAnyTask(id);
};