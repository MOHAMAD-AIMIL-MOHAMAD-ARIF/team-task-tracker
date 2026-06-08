import { useEffect, useState } from "react";
import { createProject, getProjects } from "../api/client";
import type { CreateProjectRequest, Project } from "../types/project";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectForm from "../components/projects/ProjectForm";
import ProjectList from "../components/projects/ProjectList";
import LoadingState from "../components/ui/LoadingState";
import ErrorMessage from "../components/ui/ErrorMessage";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadProjects() {
      try {
        const data = await getProjects();

        if (!ignore) {
          setProjects(data);
        }
      } catch {
        if (!ignore) {
          setErrorMessage("Could not load projects.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleCreateProject(payload: CreateProjectRequest) {
    const createdProject = await createProject(payload);
    setProjects((currentProjects) => [...currentProjects, createdProject]);
  }

  if (isLoading) return <LoadingState message="Loading projects..." />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <section>
      <SectionHeader title="Projects" subtitle="Track and create projects" />

      <ProjectForm onCreateProject={handleCreateProject} />

      <ProjectList projects={projects} />
    </section>
  );
}

export default ProjectsPage;