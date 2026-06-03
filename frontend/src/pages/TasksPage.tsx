import { useEffect, useState } from "react";
import { createTask, getTasks } from "../api/client";
import type { CreateTaskRequest, TaskItem } from "../types/task";
import SectionHeader from "../components/ui/SectionHeader";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      try {
        const data = await getTasks();

        if (!ignore) {
          setTasks(data);
        }
      } catch {
        if (!ignore) {
          setErrorMessage("Could not load tasks.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleCreateTask(payload: CreateTaskRequest) {
    const createdTask = await createTask(payload);
    setTasks((currentTasks) => [...currentTasks, createdTask]);
  }

  if (isLoading) return <p>Loading tasks...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <section>
      <SectionHeader title="Tasks" subtitle="Track and create tasks" />

      <TaskForm onCreateTask={handleCreateTask} />

      <TaskList tasks={tasks} />
    </section>
  );
}

export default TasksPage;