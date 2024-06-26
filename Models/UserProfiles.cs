using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Models;

public class UserProfile
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Address { get; set; }

    [Required]
    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
    public List<ChoreAssignment> ChoreAssignments { get; set; }
    public List<ChoreCompletion> ChoreCompletions { get; set; }


}