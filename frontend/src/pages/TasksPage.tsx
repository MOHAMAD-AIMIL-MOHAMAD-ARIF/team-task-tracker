import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { createTask, getTasks } from "../api/client";
import type { CreateTaskRequest, TaskItem } from "../types/task";
import SectionHeader from "../components/ui/SectionHeader";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

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
    let ignore = false;

    void getTasks()
      .then((data) => {
        if (!ignore) {
          setTasks(data);
        }
      })
      .catch(() => {
        if (!ignore) {
          setErrorMessage("Could not load tasks.");
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
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

  if (isLoading) return <p>Loading tasks...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <section>
      <SectionHeader title="Tasks" subtitle="Track and create tasks" />

      <TaskForm
        title={title}
        description={description}
        formError={formError}
        isSubmitting={isSubmitting}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onSubmit={handleSubmit}
      />

      <TaskList tasks={tasks} />
    </section>
  );
}

export default TasksPage;
