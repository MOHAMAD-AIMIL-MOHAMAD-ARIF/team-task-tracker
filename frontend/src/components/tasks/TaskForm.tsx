import type { SyntheticEvent } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

type TaskFormProps = {
  title: string;
  description: string;
  formError: string;
  isSubmitting: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
};

function TaskForm({
  title,
  description,
  formError,
  isSubmitting,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}: TaskFormProps) {
  return (
    <Card>
      <form onSubmit={onSubmit}>
        <Input
          id="task-title"
          label="Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          disabled={isSubmitting}
          placeholder="Enter task title"
        />

        <Input
          id="task-description"
          label="Description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          disabled={isSubmitting}
          placeholder="Optional description"
          multiline
          rows={3}
        />

        {formError ? <p style={{ color: "crimson" }}>{formError}</p> : null}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Task"}
        </Button>
      </form>
    </Card>
  );
}

export default TaskForm;