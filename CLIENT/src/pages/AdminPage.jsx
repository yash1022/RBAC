import { useEffect, useState } from "react";
import api from "../api/http";
import Shell from "../components/Shell";

const AdminPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const loadAllTasks = async () => {
    try {
      const { data } = await api.get("/tasks/all");
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load admin tasks");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAllTasks();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const deleteTaskAsAdmin = async (id) => {
    try {
      await api.delete(`/tasks/admin/${id}`);
      await loadAllTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete task");
    }
  };

  return (
    <Shell>
      <section className="panel">
        <h2>Admin Task Monitor</h2>
        <p className="muted">You can view and remove tasks created by every user.</p>
        {error && <p className="error-text">{error}</p>}

        <div className="task-grid">
          {tasks.length === 0 && <p className="muted">No tasks found.</p>}
          {tasks.map((task) => (
            <article key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description || "No description"}</p>
              <p className="meta-line">Owner: {task.userId}</p>
              <button className="danger" onClick={() => deleteTaskAsAdmin(task._id)}>
                Remove Task
              </button>
            </article>
          ))}
        </div>
      </section>
    </Shell>
  );
};

export default AdminPage;
