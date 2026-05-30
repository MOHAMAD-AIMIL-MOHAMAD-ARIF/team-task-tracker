import { useEffect, useState } from "react";
import { getTasks } from "../api/client";
import type { TaskItem } from "../types/task";

function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setErrorMessage("Could not load tasks.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <section>
      <h1>Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h2>{task.title}</h2>

              {task.description && <p>{task.description}</p>}

              <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TasksPage;