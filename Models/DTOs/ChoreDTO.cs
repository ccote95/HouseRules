using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Models.DTOs;

public class ChoreDTO
{
    public int Id { get; set; }
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
    [Required]
    [Range(1, 5)]
    public int Difficulty { get; set; }
    [Required]
    [Range(1, 14)]
    public int ChoreFrequencyDays { get; set; }
    public List<ChoreCompletionDTO> ChoreCompletions { get; set; }
    public List<ChoreAssignmentDTO>? ChoreAssignments { get; set; }

}