using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HouseRules.Data;
using HouseRules.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private HouseRulesDbContext _dbContext;

    public UserProfileController(HouseRulesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet("{Id}")]
    // [Authorize]
    public IActionResult GetUserProfileById(int Id)
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Include(up => up.choreAssignments)
            .ThenInclude(ca => ca.Chore)
        .Include(up => up.choreCompletions)
            .ThenInclude(cc => cc.Chore).Select(up => new UserProfileDTO
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Address = up.Address,
                Email = up.IdentityUser.Email,
                UserName = up.IdentityUser.UserName,
                IdentityUserId = up.IdentityUser.Id,
                ChoreAssignments = up.choreAssignments.Select(ca => new ChoreAssignmentDTO
                {
                    Id = ca.Id,
                    UserProfileId = ca.UserProfileId,
                    ChoreId = ca.ChoreId,
                    Chore = new ChoreDTO
                    {
                        Id = ca.Chore.Id,
                        Name = ca.Chore.Name,
                        Difficulty = ca.Chore.Difficulty,
                        ChoreFrequencyDays = ca.Chore.ChoreFrequencyDays
                    }
                }).ToList(),
                ChoreCompletions = up.choreCompletions.Select(cc => new ChoreCompletionDTO
                {
                    Id = cc.Id,
                    UserProfileId = cc.UserProfileId,
                    ChoreId = cc.ChoreId,
                    CompletedOn = cc.CompletedOn,
                    Chore = new ChoreDTO
                    {
                        Id = cc.Chore.Id,
                        Name = cc.Chore.Name,
                        Difficulty = cc.Chore.Difficulty,
                        ChoreFrequencyDays = cc.Chore.ChoreFrequencyDays
                    }

                }).ToList()


            })
        .FirstOrDefault(up => up.Id == Id));

    }

    public IActionResult Get()
    {
        return Ok(_dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .Include(up => up.choreAssignments)
            .Select(up => new UserProfileDTO
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Address = up.Address,
                IdentityUserId = up.IdentityUserId,
                Email = up.IdentityUser.Email,
                UserName = up.IdentityUser.UserName,
                ChoreAssignments = up.choreAssignments.Select(ca => new ChoreAssignmentDTO
                {
                    Id = ca.Id,
                    UserProfileId = ca.UserProfileId,
                    ChoreId = ca.ChoreId,

                }).ToList()
            })
            .ToList());
    }
}