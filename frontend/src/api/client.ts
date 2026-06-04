import type { TaskItem, CreateTaskRequest } from "../types/task";

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

export async function getTasks(): Promise<TaskItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/tasks`);

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

