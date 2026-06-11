import { useEffect, useState } from "react";
import { createTask, getProjects, getTasks } from "../api/client";
import type {
  CreateTaskRequest,
  TaskItem,
  TaskQueryParams,
} from "../types/task";
import type { PagedResult } from "../types/common";
import SectionHeader from "../components/ui/SectionHeader";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import LoadingState from "../components/ui/LoadingState";
import ErrorMessage from "../components/ui/ErrorMessage";
import type { Project } from "../types/project";
import Button from "../components/ui/Button";
import TaskFilters from "../components/tasks/TaskFilters";

const initialQuery: TaskQueryParams = {
  status: "all",
  search: "",
  projectName: "",
  sortBy: "id",
  sortDirection: "asc",
  pageNumber: 1,
  pageSize: 10,
};

function TasksPage() {
  const [tasksPage, setTasksPage] = useState<PagedResult<TaskItem> | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState<TaskQueryParams>(initialQuery);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadTasks(currentQuery: TaskQueryParams) {
    const data = await getTasks(currentQuery);
    setTasksPage(data);
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialData() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const [tasksData, projectsData] = await Promise.all([
          getTasks(query),
          getProjects(),
        ]);

        if (!ignore) {
          setTasksPage(tasksData);
          setProjects(projectsData);
        }
      } catch {
        if (!ignore) {
          setErrorMessage("Could not load tasks.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialData();

    return () => {
      ignore = true;
    };
  }, [query]);

  function updateQuery(partialQuery: Partial<TaskQueryParams>) {
    setQuery((currentQuery) => ({
      ...currentQuery,
      ...partialQuery,
      pageNumber: partialQuery.pageNumber ?? 1, // reset to first page on any query change
    }));
  }

  async function handleCreateTask(payload: CreateTaskRequest) {
    await createTask(payload);
    await loadTasks(query);
  }

  if (isLoading) return <LoadingState message="Loading tasks..." />;
  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <section>
      <SectionHeader title="Tasks" subtitle="Track and create tasks" />

      <TaskForm projects={projects} onCreateTask={handleCreateTask} />
      <br />
      
      <TaskFilters query={query} projects={projects} onChange={updateQuery} />
      <br />

      <TaskList tasks={tasksPage?.items ?? []} />

      {tasksPage ? (
        <div>
          <br />
          <Button
            variant="secondary"
            disabled={!tasksPage.hasPreviousPage}
            onClick={() => updateQuery({ pageNumber: query.pageNumber - 1 })}
          >
            Previous
          </Button>

          <span> </span>
          <span>
            Page {tasksPage.pageNumber} of {tasksPage.totalPages}
          </span>
          <span> </span>

          <Button
            variant="secondary"
            disabled={!tasksPage.hasNextPage}
            onClick={() => updateQuery({ pageNumber: query.pageNumber + 1 })}
          >
            Next
          </Button>
        </div>
      ) : null}
    </section>
  );
}

export default TasksPage;