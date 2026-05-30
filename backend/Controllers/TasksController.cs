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
}