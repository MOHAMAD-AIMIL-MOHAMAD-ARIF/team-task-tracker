import { useEffect, useState } from "react";
import type { SyntheticEvent  } from "react";
import { createTask, getTasks } from "../api/client";
import type { CreateTaskRequest, TaskItem } from "../types/task";

function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadTasks() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      setErrorMessage("Could not load tasks.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault();
    setFormError("");

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setFormError("Title is required.");
      return;
    }

    const payload: CreateTaskRequest = {
      title: trimmedTitle,
      description: trimmedDescription || undefined,
    };

    try {
      setIsSubmitting(true);

      await createTask(payload);

      setTitle("");
      setDescription("");

      await loadTasks();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not create task.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <section>
      <h1>Tasks</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <div style={{ marginBottom: "0.5rem" }}>
            <label htmlFor="task-title">Title</label>
            <br />
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isSubmitting}
              placeholder="Enter task title"
            />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label htmlFor="task-description">Description</label>
          <br />
          <textarea
            id="task-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={isSubmitting}
            placeholder="Optional description"
            rows={3}
          />
        </div>

        {formError && <p style={{ color: "crimson" }}>{formError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </form>

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