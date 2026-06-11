using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Tasks;

public class TaskQueryParameters
{
    public string Status { get; set; } = "all";
    public string? Search { get; set; }
    public string? ProjectName { get; set; }
    public string SortBy { get; set; } = "id";
    public string SortDirection { get; set; } = "asc";

    [Range(1, int.MaxValue)]
    public int PageNumber { get; set; } = 1;

    [Range(1, 50)]
    public int PageSize { get; set; } = 10;
}