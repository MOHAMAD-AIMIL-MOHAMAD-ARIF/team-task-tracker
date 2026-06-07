using backend.Dtos.Tasks;
using backend.Models;

namespace backend.Services.Tasks;

public class TaskService : ITaskService
{
    private readonly List<TaskItem> _tasks =
    [
        new TaskItem
        {
            Id = 1,
            Title = "Set up React+Vite frontend",
            Description = "Create the Vite React app",
            IsCompleted = true
        },
        new TaskItem
        {
            Id = 2,
            Title = "Set up ASP.NET Core backend",
            Description = "Create the Web API project",
            IsCompleted = true
        },
        new TaskItem
        {
            Id = 3,
            Title = "Connect frontend to backend",
            Description = "Fetch data from the API",
            IsCompleted = false
        }
    ];

    public IEnumerable<TaskDto> GetTasks()
    {
        return _tasks.Select(ToDto);
    }

    public TaskDto? GetTaskById(int id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        return task is null ? null : ToDto(task);
    }

    public TaskDto CreateTask(CreateTaskDto request)
    {
        var nextId = _tasks.Count == 0 ? 1 : _tasks.Max(t => t.Id) + 1;

        var task = new TaskItem
        {
            Id = nextId,
            Title = request.Title.Trim(),
            Description = string.IsNullOrWhiteSpace(request.Description)
                ? null
                : request.Description.Trim(),
            IsCompleted = false
        };

        _tasks.Add(task);

        return ToDto(task);
    }

    public TaskDto? UpdateTask(int id, UpdateTaskDto request)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);

        if (task is null)
        {
            return null;
        }

        task.Title = request.Title.Trim();
        task.Description = string.IsNullOrWhiteSpace(request.Description)
            ? null
            : request.Description.Trim();
        task.IsCompleted = request.IsCompleted;

        return ToDto(task);
    }

    public bool DeleteTask(int id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);

        if (task is null)
        {
            return false;
        }

        _tasks.Remove(task);
        return true;
    }

    private static TaskDto ToDto(TaskItem task)
    {
        return new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted
        };
    }
}