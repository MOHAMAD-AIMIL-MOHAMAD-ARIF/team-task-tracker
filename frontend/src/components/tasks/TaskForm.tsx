import { useState } from "react";
import type { FormEvent } from "react";
import type { CreateTaskRequest } from "../../types/task";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

type TaskFormProps = {
  onCreateTask: (payload: CreateTaskRequest) => Promise<void>;
};

function TaskForm({ onCreateTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
      await onCreateTask(payload);
      setTitle("");
      setDescription("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not create task.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Input
          id="task-title"
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={isSubmitting}
          placeholder="Enter task title"
        />

        <Input
          id="task-description"
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          disabled={isSubmitting}
          placeholder="Optional description"
          multiline
          rows={3}
        />

        {formError ? <p style={{ color: "crimson" }}>{formError}</p> : null}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Task"}
        </Button>
      </form>
    </Card>
  );
}

export default TaskForm;