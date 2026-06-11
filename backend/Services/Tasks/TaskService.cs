using backend.Dtos.Common;
using backend.Dtos.Tasks;
using backend.Models;
using backend.Services.Projects;

namespace backend.Services.Tasks;

public class TaskService : ITaskService
{
    private readonly IProjectService _projectService;

    public TaskService(IProjectService projectService)
    {
        _projectService = projectService;
    }

    private readonly List<TaskItem> _tasks =
    [
        new TaskItem
        {
            Id = 1,
            Title = "Set up React+Vite frontend",
            Description = "Create the Vite React app",
            IsCompleted = true,
            ProjectId = 1,
        },
        new TaskItem
        {
            Id = 2,
            Title = "Set up ASP.NET Core backend",
            Description = "Create the Web API project",
            IsCompleted = true,
            ProjectId = 2,
        },
        new TaskItem
        {
            Id = 3,
            Title = "Connect frontend to backend",
            Description = "Fetch data from the API",
            IsCompleted = false,
            ProjectId = null,
        }
    ];

    private string GetProjectName(TaskItem task)
    {
        if (task.ProjectId is null)
        {
            return "";
        }

        return _projectService.GetProjectById(task.ProjectId.Value)?.Name ?? "";
    }

    public PagedResultDto<TaskDto> GetTasks(TaskQueryParameters query)
    {
        var status = query.Status.ToLowerInvariant();
        var search = query.Search?.Trim();
        var projectName = query.ProjectName?.Trim();
        var sortBy = query.SortBy.ToLowerInvariant();
        var sortDirection = query.SortDirection.ToLowerInvariant();

        IEnumerable<TaskItem> filteredTasks = _tasks;

        if (status == "pending")
        {
            filteredTasks = filteredTasks.Where(task => !task.IsCompleted);
        }
        else if (status == "completed")
        {
            filteredTasks = filteredTasks.Where(task => task.IsCompleted);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            filteredTasks = filteredTasks.Where(task =>
            {
                var projectName = task.ProjectId is null
                    ? null
                    : _projectService.GetProjectById(task.ProjectId.Value)?.Name;

                return task.Title.Contains(search, StringComparison.OrdinalIgnoreCase)
                    || (task.Description?.Contains(search, StringComparison.OrdinalIgnoreCase) ?? false)
                    || (projectName?.Contains(search, StringComparison.OrdinalIgnoreCase) ?? false);
            });
        }

        if (!string.IsNullOrWhiteSpace(projectName))
        {
            if (projectName == "__unassigned")
            {
                filteredTasks = filteredTasks.Where(task => task.ProjectId is null);
            }
            else
            {
                filteredTasks = filteredTasks.Where(task =>
                    GetProjectName(task).Equals(projectName, StringComparison.OrdinalIgnoreCase)
                );
            }
        }

        filteredTasks = (sortBy, sortDirection) switch
        {
            ("title", "desc") => filteredTasks.OrderByDescending(task => task.Title),
            ("title", _) => filteredTasks.OrderBy(task => task.Title),

            ("status", "desc") => filteredTasks.OrderByDescending(task => task.IsCompleted),
            ("status", _) => filteredTasks.OrderBy(task => task.IsCompleted),

            ("project", "desc") => filteredTasks.OrderByDescending(task => GetProjectName(task)),
            ("project", _) => filteredTasks.OrderBy(GetProjectName),

            ("id", "desc") => filteredTasks.OrderByDescending(task => task.Id),
            _ => filteredTasks.OrderBy(task => task.Id),
        };

        var totalItems = filteredTasks.Count();
        var totalPages = (int)Math.Ceiling(totalItems / (double)query.PageSize);

        var items = filteredTasks
            .Skip((query.PageNumber - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(ToDto)
            .ToList();

        return new PagedResultDto<TaskDto>()
        {
            Items = items,
            PageNumber = query.PageNumber,
            PageSize = query.PageSize,
            TotalItems = totalItems,
            TotalPages = totalPages,
            HasPreviousPage = query.PageNumber > 1,
            HasNextPage = query.PageNumber < totalPages,
        };
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
            IsCompleted = false,
            ProjectId = request.ProjectId
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
        task.ProjectId = request.ProjectId;

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

    private TaskDto ToDto(TaskItem task)
    {
        var project = task.ProjectId is null
            ? null
            : _projectService.GetProjectById(task.ProjectId.Value);

        return new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            ProjectId = task.ProjectId,
            ProjectName = project?.Name,
        };
    }
}