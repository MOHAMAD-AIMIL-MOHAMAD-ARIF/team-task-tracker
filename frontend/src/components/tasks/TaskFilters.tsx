import type { Project } from "../../types/project";
import type { TaskQueryParams } from "../../types/task";
import Input from "../ui/Input";

type TaskFiltersProps = {
  query: TaskQueryParams;
  projects: Project[];
  onChange: (partialQuery: Partial<TaskQueryParams>) => void;
};

function TaskFilters({ query, projects, onChange }: TaskFiltersProps) {
  return (
    <div>
      <Input
        id="task-search"
        label="Search"
        value={query.search}
        onChange={(event) => onChange({ search: event.target.value })}
        placeholder="Search tasks"
      />

      <label htmlFor="task-status">Status </label>
      <select
        id="task-status"
        value={query.status}
        onChange={(event) =>
          onChange({
            status: event.target.value as TaskQueryParams["status"],
          })
        }
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <br />

      <label htmlFor="task-project-filter">Project </label>
      <select
        id="task-project-filter"
        value={query.projectName}
        onChange={(event) =>
          onChange({
            projectName: event.target.value,
          })
        }
      >
        <option value="">All projects</option>
        <option value="__unassigned">Unassigned</option>
        {projects.map((project) => (
          <option key={project.id} value={project.name}>
            {project.name}
          </option>
        ))}
      </select>

      <br />

      <label htmlFor="task-sort-by">Sort by </label>
      <select
        id="task-sort-by"
        value={query.sortBy}
        onChange={(event) =>
          onChange({
            sortBy: event.target.value as TaskQueryParams["sortBy"],
          })
        }
      >
        <option value="id">Created order</option>
        <option value="title">Title</option>
        <option value="status">Status</option>
        <option value="project">Project</option>
      </select>

      <br />

      <label htmlFor="task-sort-direction">Direction </label>
      <select
        id="task-sort-direction"
        value={query.sortDirection}
        onChange={(event) =>
          onChange({
            sortDirection: event.target.value as TaskQueryParams["sortDirection"],
          })
        }
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <br />

      <label htmlFor="task-page-size">Page size </label>
      <select
        id="task-page-size"
        value={query.pageSize}
        onChange={(event) =>
          onChange({
            pageSize: Number(event.target.value),
          })
        }
      >
        <option value={1}>1</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
}

export default TaskFilters;