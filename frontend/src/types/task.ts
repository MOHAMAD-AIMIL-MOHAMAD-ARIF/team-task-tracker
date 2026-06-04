export type TaskItem = {
    id: number;
    title: string;
    description?: string | null;
    isCompleted: boolean;
};

export type CreateTaskRequest = {
    title: string;
    description?: string;
};

export type UpdateTaskRequest = {
  title: string;
  description?: string;
  isCompleted: boolean;
};