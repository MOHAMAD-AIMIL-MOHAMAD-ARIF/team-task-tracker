export type TaskItem = {
    id: number;
    title: string;
    description?: string | null;
    isCompleted: boolean;
    projectId?: number | null;
    projectName?: string | null;
};

export type CreateTaskRequest = {
    title: string;
    description?: string;
    projectId?: number | null;
};

export type UpdateTaskRequest = {
  title: string;
  description?: string;
  isCompleted: boolean;
  projectId?: number | null;
};