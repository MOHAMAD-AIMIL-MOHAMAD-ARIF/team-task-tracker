using backend.Dtos.Tasks;
using backend.Services.Projects;
using backend.Services.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;
    private readonly IProjectService _projectService;

    public TasksController(
        ITaskService taskService,
        IProjectService projectService)
    {
        _taskService = taskService;
        _projectService = projectService;
    }

    private bool ProjectExists(int? projectId)
    {
        return projectId is null || _projectService.GetProjectById(projectId.Value) is not null;
    }

    [HttpGet]
    [ProducesResponseType(typeof(TaskDto[]), StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<TaskDto>> GetTasks()
    {
        return Ok(_taskService.GetTasks());
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(TaskDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public ActionResult<TaskDto> GetTaskById(int id)
    {
        var task = _taskService.GetTaskById(id);

        if (task is null)
        {
            return NotFound(new ProblemDetails
            {
                Title = "Task not found",
                Detail = $"No task exists with id {id}.",
                Status = StatusCodes.Status404NotFound
            });
        }

        return Ok(task);
    }

    [HttpPost]
    [ProducesResponseType(typeof(TaskDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public ActionResult<TaskDto> CreateTask([FromBody] CreateTaskDto request)
    {
        if (!ProjectExists(request.ProjectId))
        {
            ModelState.AddModelError(
                nameof(request.ProjectId),
                $"No project exists with id {request.ProjectId}."
            );

            return ValidationProblem(ModelState);
        }

        var task = _taskService.CreateTask(request);

        return CreatedAtAction(
            nameof(GetTaskById),
            new { id = task.Id },
            task
        );
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(TaskDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public ActionResult<TaskDto> UpdateTask(int id, [FromBody] UpdateTaskDto request)
    {
        if (!ProjectExists(request.ProjectId))
        {
            ModelState.AddModelError(
                nameof(request.ProjectId),
                $"No project exists with id {request.ProjectId}."
            );

            return ValidationProblem(ModelState);
        }

        var task = _taskService.UpdateTask(id, request);

        if (task is null)
        {
            return NotFound(new ProblemDetails
            {
                Title = "Task not found",
                Detail = $"No task exists with id {id}.",
                Status = StatusCodes.Status404NotFound
            });
        }

        return Ok(task);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public IActionResult DeleteTask(int id)
    {
        var deleted = _taskService.DeleteTask(id);

        if (!deleted)
        {
            return NotFound(new ProblemDetails
            {
                Title = "Task not found",
                Detail = $"Couldn't delete, no task exists with id {id}.",
                Status = StatusCodes.Status404NotFound
            });
        }

        return NoContent();
    }
}