import { useState } from "react";
import type { FormEvent } from "react";
import type { CreateTaskRequest } from "../../types/task";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import type { Project } from "../../types/project";

type TaskFormProps = {
  projects: Project[];
  onCreateTask: (payload: CreateTaskRequest) => Promise<void>;
};

function TaskForm({ projects, onCreateTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectId, setProjectId] = useState("");

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
      projectId: projectId ? Number(projectId) : null,
    };

    try {
      setIsSubmitting(true);
      await onCreateTask(payload);
      setTitle("");
      setDescription("");
      setProjectId("");
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
        <label htmlFor="task-project">Project</label><br />
        <select
          id="task-project"
          value={projectId}
          onChange={(event) => setProjectId(event.target.value)}
          disabled={isSubmitting}
        >
          <option value="">Unassigned</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <br /><br />
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

        {formError ? (
          <ErrorMessage message={formError} variant="inline" />
        ) : null}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Task"}
        </Button>
      </form>
    </Card>
  );
}

export default TaskForm;