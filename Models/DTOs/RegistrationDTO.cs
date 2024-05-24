using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models.DTOs;

public class RegistrationDTO
{
    [EmailAddress]
    public string Email { get; set; }
    public string Password { get; set; }
    [MaxLength(50, ErrorMessage = "UserName names must be 50 characters or less")]
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }

}