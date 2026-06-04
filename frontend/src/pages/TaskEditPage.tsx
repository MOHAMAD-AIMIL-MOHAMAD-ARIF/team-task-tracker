import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTask } from "../api/client";
import type { TaskItem } from "../types/task";
import SectionHeader from "../components/ui/SectionHeader";
import LoadingState from "../components/ui/LoadingState";
import ErrorMessage from "../components/ui/ErrorMessage";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function TaskEditPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskItem | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!taskId) return;
    const id = taskId;

    async function loadTask() {
      try {
        const data = await getTask(id);
        setTask(data);
        setTitle(data.title);
        setDescription(data.description || "");
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
      <SectionHeader title="Edit Task" subtitle={task.title} />

      <Card>
        <form>
          <Input
            id="edit-task-title"
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <Input
            id="edit-task-description"
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            multiline
            rows={3}
          />

          <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>

          <Button type="button" disabled>
            Save changes coming Day 12
          </Button>

          <br />
          <Link to={`/tasks/${task.id}`}>Cancel</Link>
        </form>
      </Card>
    </section>
  );
}

export default TaskEditPage;