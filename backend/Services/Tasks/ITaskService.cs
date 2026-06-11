using backend.Dtos.Tasks;
using backend.Dtos.Common;

namespace backend.Services.Tasks;

public interface ITaskService
{
    PagedResultDto<TaskDto> GetTasks(TaskQueryParameters query);

    TaskDto? GetTaskById(int id);

    TaskDto CreateTask(CreateTaskDto request);

    TaskDto? UpdateTask(int id, UpdateTaskDto request);

    bool DeleteTask(int id);
}