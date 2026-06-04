import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTask, updateTask  } from "../api/client";
import type { TaskItem } from "../types/task";
import SectionHeader from "../components/ui/SectionHeader";
import LoadingState from "../components/ui/LoadingState";
import ErrorMessage from "../components/ui/ErrorMessage";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function TaskEditPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskItem | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!taskId) return;
    const id = taskId;

    async function loadTask() {
      try {
        const data = await getTask(id);
        setTask(data);
        setTitle(data.title);
        setDescription(data.description || "");
        setIsCompleted(data.isCompleted);
      } catch {
        setErrorMessage("Could not load task.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadTask();
  }, [taskId]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormError("");

        if (!taskId) return;

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle) {
            setFormError("Title is required.");
            return;
        }

        try {
            setIsSubmitting(true);

            const updatedTask = await updateTask(taskId, {
            title: trimmedTitle,
            description: trimmedDescription || undefined,
            isCompleted,
            });

            navigate(`/tasks/${updatedTask.id}`);
        } catch (error) {
            const message =
            error instanceof Error ? error.message : "Could not update task.";
            setFormError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

  if (isLoading) return <LoadingState message="Loading task..." />;
  if (errorMessage || !task) return <ErrorMessage message={errorMessage || "Task not found."} />;

  return (
    <section>
      <SectionHeader title="Edit Task" subtitle={task.title} />

      <Card>
        <form onSubmit={handleSubmit}>
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

          <label>
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={(event) => setIsCompleted(event.target.checked)}
                disabled={isSubmitting}
            />
            Completed
          </label>

          {formError ? <ErrorMessage message={formError} variant="inline" /> : null}

          <br /><br />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>

          <br />
          <Link to={`/tasks/${task.id}`}>Cancel</Link>
        </form>
      </Card>
    </section>
  );
}

export default TaskEditPage;