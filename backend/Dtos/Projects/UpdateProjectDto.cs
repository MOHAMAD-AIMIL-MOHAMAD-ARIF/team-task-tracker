using backend.Validation;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Projects;

public class UpdateProjectDto
{
    [Required(ErrorMessage = "Name is required.")]
    [NotWhiteSpace(ErrorMessage = "Name is required.")]
    [MaxLength(120, ErrorMessage = "Name must be 120 characters or less.")]
    public string Name { get; set; } = "";

    [MaxLength(1000, ErrorMessage = "Description must be 1000 characters or fewer.")]
    public string? Description { get; set; }
}