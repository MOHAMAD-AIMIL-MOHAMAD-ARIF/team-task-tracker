import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProject, getProject } from "../api/client";
import type { Project } from "../types/project";
import SectionHeader from "../components/ui/SectionHeader";
import LoadingState from "../components/ui/LoadingState";
import ErrorMessage from "../components/ui/ErrorMessage";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function ProjectDetailsPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (!projectId) return;
    const id = projectId;

    async function loadProject() {
      try {
        const data = await getProject(id);
        setProject(data);
      } catch {
        setErrorMessage("Could not load project.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadProject();
  }, [projectId]);

  async function handleDeleteProject() {
    if (!project) return;

    try {
      setIsDeleting(true);
      setDeleteError("");

      await deleteProject(project.id);

      navigate("/projects");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not delete project.";

      setDeleteError(message);
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) return <LoadingState message="Loading project..." />;

  if (errorMessage || !project) {
    return <ErrorMessage message={errorMessage || "Project not found."} />;
  }

  return (
    <section>
      <SectionHeader title={project.name} subtitle="Project details" />

      <Card>
        <p>{project.description || "No description provided."}</p>

        <Link to={`/projects/${project.id}/edit`}>
          <Button variant="secondary">Edit Project</Button>
        </Link>

        <br />
        <br />

        <Link to="/projects">
          <Button variant="secondary">Back to Projects</Button>
        </Link>
      </Card>

      {deleteError ? (
        <ErrorMessage message={deleteError} variant="inline" />
      ) : null}

      {isConfirmingDelete ? (
        <>
          <p>Are you sure you want to delete this project?</p>

          <Button
            variant="danger"
            onClick={handleDeleteProject}
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
        <Button variant="danger" onClick={() => setIsConfirmingDelete(true)}>
          Delete Project
        </Button>
      )}
    </section>
  );
}

export default ProjectDetailsPage;