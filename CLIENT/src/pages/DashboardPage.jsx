import { useEffect, useState } from "react";
import api from "../api/http";
import Shell from "../components/Shell";

const initialForm = {
  title: "",
  description: "",
};

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load tasks");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/tasks", form);
      setForm(initialForm);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete task");
    }
  };

  const toggleCompleted = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update task");
    }
  };

  return (
    <Shell>
      <section className="panel">
        <h2>Create Task</h2>
        <form className="task-form" onSubmit={handleCreateTask}>
          <input
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />
          <button type="submit">Add Task</button>
        </form>
      </section>

      <section className="panel">
        <h2>My Tasks</h2>
        {error && <p className="error-text">{error}</p>}
        <div className="task-grid">
          {tasks.length === 0 && <p className="muted">No tasks available.</p>}
          {tasks.map((task) => (
            <article key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description || "No description"}</p>
              <div className="task-actions">
                <button onClick={() => toggleCompleted(task)}>
                  {task.completed ? "Mark Pending" : "Mark Done"}
                </button>
                <button className="danger" onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Shell>
  );
};

export default DashboardPage;
