using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Models;

public class ChoreCompletion
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; }
    [Required]
    public int ChoreId { get; set; }
    public Chore Chore { get; set; }
    [Required]
    public DateTime CompletedOn { get; set; }
}