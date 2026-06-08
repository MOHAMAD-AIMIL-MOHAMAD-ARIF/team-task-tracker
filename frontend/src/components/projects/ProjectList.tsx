import type { Project } from "../../types/project";
import ProjectListItem from "./ProjectListItem";

type ProjectListProps = {
  projects: Project[];
};

function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <div>
      {projects.map((project) => (
        <ProjectListItem key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;