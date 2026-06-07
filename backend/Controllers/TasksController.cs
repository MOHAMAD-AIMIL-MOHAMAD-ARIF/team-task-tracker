using backend.Dtos.Tasks;
using backend.Services.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<TaskDto>> GetTasks()
    {
        return Ok(_taskService.GetTasks());
    }

    [HttpGet("{id:int}")]
    public ActionResult<TaskDto> GetTaskById(int id)
    {
        var task = _taskService.GetTaskById(id);

        if (task is null)
        {
            return NotFound(new { message = "Task not found." });
        }

        return Ok(task);
    }

    [HttpPost]
    public ActionResult<TaskDto> CreateTask([FromBody] CreateTaskDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            return BadRequest(new { message = "Title is required." });

        var task = _taskService.CreateTask(request);

        return CreatedAtAction(
            nameof(GetTaskById),
            new { id = task.Id },
            task
        );
    }

    [HttpPut("{id:int}")]
    public ActionResult<TaskDto> UpdateTask(int id, [FromBody] UpdateTaskDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            return BadRequest(new { message = "Title is required." });

        var task = _taskService.UpdateTask(id, request);

        if (task is null)
        {
            return NotFound(new { message = "Task not found." });
        }

        return Ok(task);
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteTask(int id)
    {
        var deleted = _taskService.DeleteTask(id);

        if (!deleted)
        {
            return NotFound(new { message = "Task not found." });
        }

        return NoContent();
    }
}