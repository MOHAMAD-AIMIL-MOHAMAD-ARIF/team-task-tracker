using backend.Dtos.Projects;
using backend.Services.Projects;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ProjectDto[]), StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<ProjectDto>> GetProjects()
    {
        return Ok(_projectService.GetProjects());
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ProjectDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public ActionResult<ProjectDto> GetProjectById(int id)
    {
        var project = _projectService.GetProjectById(id);

        if (project is null)
        {
            return NotFound(new ProblemDetails
            {
                Title = "Project not found",
                Detail = $"No project exists with id {id}.",
                Status = StatusCodes.Status404NotFound
            });
        }

        return Ok(project);
    }

    [HttpPost]
    [ProducesResponseType(typeof(ProjectDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public ActionResult<ProjectDto> CreateProject([FromBody] CreateProjectDto request)
    {
        var project = _projectService.CreateProject(request);

        return CreatedAtAction(
            nameof(GetProjectById),
            new { id = project.Id },
            project
        );
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(ProjectDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public ActionResult<ProjectDto> UpdateProject(int id, [FromBody] UpdateProjectDto request)
    {
        var project = _projectService.UpdateProject(id, request);

        if (project is null)
        {
            return NotFound(new ProblemDetails
            {
                Title = "Project not found",
                Detail = $"No project exists with id {id}.",
                Status = StatusCodes.Status404NotFound
            });
        }

        return Ok(project);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public IActionResult DeleteProject(int id)
    {
        var deleted = _projectService.DeleteProject(id);

        if (!deleted)
        {
            return NotFound(new ProblemDetails
            {
                Title = "Project not found",
                Detail = $"Couldn't delete, no project exists with id {id}.",
                Status = StatusCodes.Status404NotFound
            });
        }

        return NoContent();
    }
}