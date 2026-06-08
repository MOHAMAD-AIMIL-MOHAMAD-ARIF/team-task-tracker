import { Link } from "react-router-dom";
import type { Project } from "../../types/project";
import Card from "../ui/Card";

type ProjectListItemProps = {
  project: Project;
};

function ProjectListItem({ project }: ProjectListItemProps) {
  return (
    <Link to={`/projects/${project.id}`}>
      <Card>
        <h2>{project.name}</h2>
        {project.description ? <p>{project.description}</p> : null}
      </Card>
    </Link>
  );
}

export default ProjectListItem;