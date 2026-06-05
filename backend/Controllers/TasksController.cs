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

    [HttpGet("{id:int}")]
    public ActionResult<TaskItem> GetTaskById(int id)
    {
        var task = Tasks.FirstOrDefault(t => t.Id == id);

        if (task is null)
        {
            return NotFound(new { message = "Task not found." });
        }

        return Ok(task);
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

    [HttpPut("{id:int}")]
    public ActionResult<TaskItem> UpdateTask(int id, [FromBody] UpdateTaskRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            return BadRequest(new { message = "Title is required." });

        var task = Tasks.FirstOrDefault(t => t.Id == id);

        if (task is null)
        {
            return NotFound(new { message = "Task not found." });
        }

        task.Title = request.Title.Trim();
        task.Description = string.IsNullOrWhiteSpace(request.Description)
            ? null
            : request.Description.Trim();
        task.IsCompleted = request.IsCompleted;

        return Ok(task);
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteTask(int id)
    {
        var task = Tasks.FirstOrDefault(t => t.Id == id);

        if (task is null)
        {
            return NotFound(new { message = "Task not found." });
        }

        Tasks.Remove(task);

        return NoContent();
    }

}

// DTO for POST /api/tasks input
public class CreateTaskRequest
{
    public string Title { get; set; } = "";
    public string? Description { get; set; }
}

// DTO for PUT /api/tasks/{id} 
public class UpdateTaskRequest
{
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
}