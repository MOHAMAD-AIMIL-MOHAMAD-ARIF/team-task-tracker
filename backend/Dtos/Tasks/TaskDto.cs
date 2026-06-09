namespace backend.Dtos.Tasks;

public class TaskDto
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public int? ProjectId { get; set; }
    public string? ProjectName { get; set; }
}