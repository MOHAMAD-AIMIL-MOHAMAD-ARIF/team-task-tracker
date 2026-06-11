import type {
  TaskItem,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskQueryParams,
} from "../types/task";
import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "../types/project";
import type { PagedResult } from "../types/common";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("Missing VITE_API_BASE_URL environment variable.");
}

export async function getHealth() {
    const response = await fetch(`${API_BASE_URL}/api/health`);

    if (!response.ok) {
        throw new Error(`Health check failed with status ${response.status}`);
    }

    return response.json();
}

/*
  Functions for Tasks domain
*/

export async function getTasks(
  query: TaskQueryParams
): Promise<PagedResult<TaskItem>> {
    const params = new URLSearchParams({
      status: query.status,
      search: query.search,
      projectName: query.projectName,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      pageNumber: String(query.pageNumber),
      pageSize: String(query.pageSize),
    });

    const response = await fetch(`${API_BASE_URL}/api/tasks?${params}`);

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
}

export async function createTask(payload: CreateTaskRequest): Promise<TaskItem> {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        let message = "Failed to create task";

        try {
            const errorBody = await response.json();
            if (typeof errorBody?.message === "string") {
                message = errorBody.message;
            } else if (typeof errorBody?.title === "string") {
                message = errorBody.title;
            }
        } catch {
            // keep default message if response is not JSON
        }

        throw new Error(message);
    }

    return response.json();
}

export async function getTask(id: number | string): Promise<TaskItem> {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return response.json();
}

export async function updateTask(
  id: number | string,
  payload: UpdateTaskRequest
): Promise<TaskItem> {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Failed to update task";

    try {
      const errorBody = await response.json();

      if (typeof errorBody?.message === "string") {
        message = errorBody.message;
      } else if (typeof errorBody?.title === "string") {
        message = errorBody.title;
      }
    } catch {
      // keep default message if response is not JSON
    }

    throw new Error(message);
  }

  return response.json();
}

export async function deleteTask(id: number | string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    let message = "Failed to delete task";

    try {
      const errorBody = await response.json();

      if (typeof errorBody?.message === "string") {
        message = errorBody.message;
      } else if (typeof errorBody?.title === "string") {
        message = errorBody.title;
      }
    } catch {
      // keep default message if response is not JSON
    }

    throw new Error(message);
  }
}

/*
  Functions for Projects domain
*/

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/api/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function createProject(
  payload: CreateProjectRequest
): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Failed to create project";

    try {
      const errorBody = await response.json();

      if (typeof errorBody?.message === "string") {
        message = errorBody.message;
      } else if (typeof errorBody?.title === "string") {
        message = errorBody.title;
      }
    } catch {
      // keep default message if response is not JSON
    }

    throw new Error(message);
  }

  return response.json();
}

export async function getProject(id: number | string): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  return response.json();
}

export async function updateProject(
  id: number | string,
  payload: UpdateProjectRequest
): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Failed to update project";

    try {
      const errorBody = await response.json();

      if (typeof errorBody?.message === "string") {
        message = errorBody.message;
      } else if (typeof errorBody?.title === "string") {
        message = errorBody.title;
      }
    } catch {
      // keep default message if response is not JSON
    }

    throw new Error(message);
  }

  return response.json();
}

export async function deleteProject(id: number | string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    let message = "Failed to delete project";

    try {
      const errorBody = await response.json();

      if (typeof errorBody?.message === "string") {
        message = errorBody.message;
      } else if (typeof errorBody?.title === "string") {
        message = errorBody.title;
      }
    } catch {
      // keep default message if response is not JSON
    }

    throw new Error(message);
  }
}
