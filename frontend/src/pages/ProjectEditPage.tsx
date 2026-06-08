import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProject, updateProject } from "../api/client";
import type { Project } from "../types/project";
import SectionHeader from "../components/ui/SectionHeader";
import LoadingState from "../components/ui/LoadingState";
import ErrorMessage from "../components/ui/ErrorMessage";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function ProjectEditPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!projectId) return;
    const id = projectId;

    async function loadProject() {
      try {
        const data = await getProject(id);
        setProject(data);
        setName(data.name);
        setDescription(data.description || "");
      } catch {
        setErrorMessage("Could not load project.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadProject();
  }, [projectId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!projectId) return;

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      setFormError("Name is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const updatedProject = await updateProject(projectId, {
        name: trimmedName,
        description: trimmedDescription || undefined,
      });

      navigate(`/projects/${updatedProject.id}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not update project.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) return <LoadingState message="Loading project..." />;

  if (errorMessage || !project) {
    return <ErrorMessage message={errorMessage || "Project not found."} />;
  }

  return (
    <section>
      <SectionHeader title="Edit Project" subtitle={project.name} />

      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            id="edit-project-name"
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isSubmitting}
          />

          <Input
            id="edit-project-description"
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={isSubmitting}
            multiline
            rows={3}
          />

          {formError ? (
            <ErrorMessage message={formError} variant="inline" />
          ) : null}

          <br />
          <br />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>

          <br />

          <Link to={`/projects/${project.id}`}>Cancel</Link>
        </form>
      </Card>
    </section>
  );
}

export default ProjectEditPage;