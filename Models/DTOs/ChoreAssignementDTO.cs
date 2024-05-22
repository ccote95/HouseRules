using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
namespace HouseRules.Models.DTOs;


public class ChoreAssignmentDTO
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    public UserProfileDTO UserProfile { get; set; }
    [Required]
    public int ChoreId { get; set; }
    public ChoreDTO Chore { get; set; }
}