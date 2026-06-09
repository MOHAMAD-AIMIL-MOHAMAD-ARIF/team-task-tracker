using backend.Validation;
using System.ComponentModel.DataAnnotations;
namespace backend.Dtos.Tasks;

public class UpdateTaskDto
{
    [Required(ErrorMessage = "Title is required.")]
    [NotWhiteSpace(ErrorMessage = "Title is required.")]
    [MaxLength(120, ErrorMessage = "Title must be 120 characters or less.")]
    public string Title { get; set; } = "";

    [MaxLength(1000, ErrorMessage = "Description must be 1000 characters or fewer.")]
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public int? ProjectId { get; set; }
}