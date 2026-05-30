import type { TaskItem } from "../types/task";

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