using backend.Dtos.Projects;

namespace backend.Services.Projects;

public interface IProjectService
{
    IEnumerable<ProjectDto> GetProjects();

    ProjectDto? GetProjectById(int id);

    ProjectDto CreateProject(CreateProjectDto request);

    ProjectDto? UpdateProject(int id, UpdateProjectDto request);

    bool DeleteProject(int id);
}