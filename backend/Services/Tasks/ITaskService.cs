using backend.Dtos.Tasks;

namespace backend.Services.Tasks;

public interface ITaskService
{
    IEnumerable<TaskDto> GetTasks();

    TaskDto? GetTaskById(int id);

    TaskDto CreateTask(CreateTaskDto request);

    TaskDto? UpdateTask(int id, UpdateTaskDto request);

    bool DeleteTask(int id);
}