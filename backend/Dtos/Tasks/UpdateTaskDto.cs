namespace backend.Dtos.Tasks;

public class UpdateTaskDto
{
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
}