using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static readonly List<TaskItem> Tasks =
    [
        new TaskItem
        {
            Id = 1,
            Title = "Set up React frontend",
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

    [HttpGet]
    public ActionResult<IEnumerable<TaskItem>> GetTasks()
    {
        return Ok(Tasks);
    }

    [HttpPost]
    public ActionResult<TaskItem> CreateTask([FromBody] CreateTaskRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            return BadRequest(new { message = "Title is required." });

        var nextId = Tasks.Count == 0 ? 1 : Tasks.Max(t => t.Id) + 1;

        var newTask = new TaskItem()
        {
            Id = nextId,
            Title = request.Title.Trim(),
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            IsCompleted = false
        };

        Tasks.Add(newTask);

        return Created($"api/tasks/{newTask.Id}", newTask);
    }
}

// DTO for POST /api/tasks input
public class CreateTaskRequest
{
    public string Title { get; set; } = "";
    public string? Description { get; set; }
}