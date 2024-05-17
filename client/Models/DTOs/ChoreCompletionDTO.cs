using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Models.DTOs;

public class ChoreCompletionDTO
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    [Required]
    public int ChoreId { get; set; }
    [Required]
    public DateTime CompletedOn { get; set; }
}