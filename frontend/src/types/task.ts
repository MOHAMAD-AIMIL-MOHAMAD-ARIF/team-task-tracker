export type TaskStatusFilter = "all" | "pending" | "completed";
export type TaskSortBy = "id" | "title" | "status" | "project";
export type SortDirection = "asc" | "desc";

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

export type TaskQueryParams = {
  status: TaskStatusFilter;
  search: string;
  projectName: string;
  sortBy: TaskSortBy;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
};