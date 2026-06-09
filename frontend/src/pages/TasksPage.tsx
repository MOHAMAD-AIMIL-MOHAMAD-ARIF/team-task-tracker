import { useEffect, useState } from "react";
import { createTask, getProjects, getTasks } from "../api/client";
import type { CreateTaskRequest, TaskItem } from "../types/task";
import SectionHeader from "../components/ui/SectionHeader";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import LoadingState from "../components/ui/LoadingState";
import ErrorMessage from "../components/ui/ErrorMessage";
import type { Project } from "../types/project";

function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      try {
        const [tasksData, projectsData] = await Promise.all([
          getTasks(),
          getProjects(),
        ]);

        if (!ignore) {
          setTasks(tasksData);
          setProjects(projectsData);
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

  if (isLoading) return <LoadingState message="Loading tasks..." />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <section>
      <SectionHeader title="Tasks" subtitle="Track and create tasks" />

      <TaskForm projects={projects} onCreateTask={handleCreateTask} />

      <TaskList tasks={tasks} />
    </section>
  );
}

export default TasksPage;