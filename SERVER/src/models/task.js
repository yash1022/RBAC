import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  description:{
    type: String,
  },
  completed:{
    type: Boolean,
    default:false
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  }
},
{timestamps:true});

const task = mongoose.model("task",taskSchema);

export default task;