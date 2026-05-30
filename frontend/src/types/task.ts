export type TaskItem = {
    id: number;
    title: string;
    description?: string | null;
    isCompleted: boolean;
};