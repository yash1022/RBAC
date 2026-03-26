import task from "../models/task.js";


export const createTask = async(data)=>{

    const newTask = new task(data);

    await newTask.save();
    return newTask;

}

export const getTasks = async(userId)=>{

    const tasks = await task.find({userId});

    return tasks;
}

export const getAllTasks = async()=>{

    const tasks = await task.find(); 
    
    return tasks;
}

export const updateTask = async(id,data)=>{

    const updatedTask = await task.findByIdAndUpdate(id,data,{new:true});

    return updatedTask;
}




export const deleteTask = (id, userId) =>
    task.findOneAndDelete({ _id: id, userId });

export const deleteAnyTask = (id) =>
    {
                return task.findByIdAndDelete(id);

    }