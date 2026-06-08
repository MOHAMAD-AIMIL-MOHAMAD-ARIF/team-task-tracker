using backend.Dtos.Projects;
using backend.Models;

namespace backend.Services.Projects;

public class ProjectService : IProjectService
{
    private readonly List<Project> _projects =
    [
        new Project
        {
            Id = 1,
            Name = "Website Redesign",
            Description = "Refresh the public marketing site."
        },
        new Project
        {
            Id = 2,
            Name = "Internal Tools",
            Description = "Improve team workflow tools."
        }
    ];

    public IEnumerable<ProjectDto> GetProjects()
    {
        return _projects.Select(ToDto);
    }

    public ProjectDto? GetProjectById(int id)
    {
        var project = _projects.FirstOrDefault(project => project.Id == id);
        return project is null ? null : ToDto(project);
    }

    public ProjectDto CreateProject(CreateProjectDto request)
    {
        var nextId = _projects.Count == 0 ? 1 : _projects.Max(project => project.Id) + 1;

        var project = new Project
        {
            Id = nextId,
            Name = request.Name.Trim(),
            Description = string.IsNullOrWhiteSpace(request.Description)
                ? null
                : request.Description.Trim()
        };

        _projects.Add(project);

        return ToDto(project);
    }

    public ProjectDto? UpdateProject(int id, UpdateProjectDto request)
    {
        var project = _projects.FirstOrDefault(project => project.Id == id);

        if (project is null)
        {
            return null;
        }

        project.Name = request.Name.Trim();
        project.Description = string.IsNullOrWhiteSpace(request.Description)
            ? null
            : request.Description.Trim();

        return ToDto(project);
    }

    public bool DeleteProject(int id)
    {
        var project = _projects.FirstOrDefault(project => project.Id == id);

        if (project is null)
        {
            return false;
        }

        _projects.Remove(project);
        return true;
    }

    private static ProjectDto ToDto(Project project)
    {
        return new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description
        };
    }
}