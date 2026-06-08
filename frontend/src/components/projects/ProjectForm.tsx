import { useState } from "react";
import type { FormEvent } from "react";
import type { CreateProjectRequest } from "../../types/project";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";

type ProjectFormProps = {
  onCreateProject: (payload: CreateProjectRequest) => Promise<void>;
};

function ProjectForm({ onCreateProject }: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      setFormError("Name is required.");
      return;
    }

    const payload: CreateProjectRequest = {
      name: trimmedName,
      description: trimmedDescription || undefined,
    };

    try {
      setIsSubmitting(true);
      await onCreateProject(payload);
      setName("");
      setDescription("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not create project.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Input
          id="project-name"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={isSubmitting}
          placeholder="Enter project name"
        />

        <Input
          id="project-description"
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
          {isSubmitting ? "Creating..." : "Create Project"}
        </Button>
      </form>
    </Card>
  );
}

export default ProjectForm;