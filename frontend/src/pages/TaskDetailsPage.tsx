import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTask } from "../api/client";
import type { TaskItem } from "../types/task";
import SectionHeader from "../components/ui/SectionHeader";
import LoadingState from "../components/ui/LoadingState";
import ErrorMessage from "../components/ui/ErrorMessage";
import Card from "../components/ui/Card";

function TaskDetailsPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!taskId) return;
    const id = taskId;

    async function loadTask() {
      try {
        const data = await getTask(id);
        setTask(data);
      } catch {
        setErrorMessage("Could not load task.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadTask();
  }, [taskId]);

  if (isLoading) return <LoadingState message="Loading task..." />;
  if (errorMessage || !task) return <ErrorMessage message={errorMessage || "Task not found."} />;

  return (
    <section>
      <SectionHeader title={task.title} subtitle="Task details" />

      <Card>
        <p>{task.description || "No description provided."}</p>
        <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>

        <Link to={`/tasks/${task.id}/edit`}>Edit task</Link>
        <br />
        <Link to="/tasks">Back to tasks</Link>
      </Card>
    </section>
  );
}

export default TaskDetailsPage;