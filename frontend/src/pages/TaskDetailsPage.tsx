import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTask, deleteTask  } from "../api/client";
import type { TaskItem } from "../types/task";
import SectionHeader from "../components/ui/SectionHeader";
import LoadingState from "../components/ui/LoadingState";
import ErrorMessage from "../components/ui/ErrorMessage";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function TaskDetailsPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

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

  async function handleDeleteTask() {
  if (!task) return;

  try {
    setIsDeleting(true);
    setDeleteError("");

    await deleteTask(task.id);

    navigate("/tasks");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not delete task.";

    setDeleteError(message);
  } finally {
    setIsDeleting(false);
  }
}

  if (isLoading) return <LoadingState message="Loading task..." />;
  if (errorMessage || !task) return <ErrorMessage message={errorMessage || "Task not found."} />;

  return (
    <section>
      <SectionHeader title={task.title} subtitle="Task details" />

      <Card>
        <p>{task.description || "No description provided."}</p>
        <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>

        <Link to={`/tasks/${task.id}/edit`}>
          <Button variant="secondary">
            Edit Task
          </Button>
        </Link>
        <br /><br />
        <Link to="/tasks">
          <Button variant="secondary">
            Back to Tasks
          </Button>
        </Link>
      </Card>

      {deleteError ? (
        <ErrorMessage message={deleteError} variant="inline" />
      ) : null}

      {isConfirmingDelete ? (
        <>
          <p>Are you sure you want to delete this task?</p>

          <Button
            variant="danger"
            onClick={handleDeleteTask}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, delete"}
          </Button>

          <Button
            variant="secondary"
            onClick={() => setIsConfirmingDelete(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button
          variant="danger"
          onClick={() => setIsConfirmingDelete(true)}
        >
          Delete Task
        </Button>
      )}
    </section>
  );
}

export default TaskDetailsPage;