using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HouseRules.Data;
using HouseRules.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Identity;
using System.Runtime.InteropServices;

namespace HouseRules.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
    private HouseRulesDbContext _dbContext;

    public ChoreController(HouseRulesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetChores()
    {
        return Ok(_dbContext.Chores
        .Include(c => c.ChoreCompletions)
        .OrderBy(c => c.Id)
        .Select(c => new ChoreDTO
        {
            Id = c.Id,
            Name = c.Name,
            Difficulty = c.Difficulty,
            ChoreFrequencyDays = c.ChoreFrequencyDays,
            ChoreCompletions = c.ChoreCompletions.Select(cc => new ChoreCompletionDTO
            {
                Id = cc.Id,
                UserProfileId = cc.UserProfileId,
                ChoreId = cc.ChoreId,
                CompletedOn = cc.CompletedOn

            }).ToList()

        }));

    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetChoreById(int id)
    {
        return Ok(_dbContext.Chores
        .Where(c => c.Id == id)
        .Select(c => new ChoreDTO
        {
            Id = c.Id,
            Name = c.Name,
            Difficulty = c.Difficulty,
            ChoreFrequencyDays = c.ChoreFrequencyDays
        }));
    }


    [HttpPost("{id}/complete")]
    [Authorize]
    public IActionResult CompleteChore(int id, int? UserId)
    {
        Chore chore = _dbContext.Chores.FirstOrDefault(c => c.Id == id);
        UserProfile userProfile = _dbContext.UserProfiles.FirstOrDefault(up => up.Id == UserId);

        ChoreCompletion choreToComplete = new ChoreCompletion
        {
            UserProfileId = userProfile.Id,
            ChoreId = chore.Id,
            CompletedOn = DateTime.Now

        };
        _dbContext.ChoreCompletions.Add(choreToComplete);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult AddANewChore(Chore chore)
    {
        _dbContext.Chores.Add(chore);
        _dbContext.SaveChanges();
        return Ok();
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult UpdateAChore(Chore chore, int id)
    {
        Chore choreToUpdate = _dbContext.Chores.FirstOrDefault(c => c.Id == id);

        choreToUpdate.Name = chore.Name;
        choreToUpdate.Difficulty = chore.Difficulty;
        choreToUpdate.ChoreFrequencyDays = chore.ChoreFrequencyDays;
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpDelete]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteAChore(int id)
    {
        Chore choreToDelete = _dbContext.Chores.Find(id);
        if (choreToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Remove(choreToDelete);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("{id}/assign")]
    [Authorize(Roles = "Admin")]
    public IActionResult AssignAChore(int id, int? UserId)
    {
        Chore choreToAssign = _dbContext.Chores.Find(id);
        UserProfile userToAssign = _dbContext.UserProfiles.Find(UserId);


        ChoreAssignment newAssignment = new ChoreAssignment
        {
            UserProfileId = userToAssign.Id,
            ChoreId = choreToAssign.Id
        };
        _dbContext.ChoreAssignments.Add(newAssignment);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("{id}/unassign")]
    [Authorize(Roles = "Admin")]
    public IActionResult UnassignChore(int id, int? UserId)
    {
        ChoreAssignment choreToUnassign = _dbContext.ChoreAssignments.SingleOrDefault(ca => ca.ChoreId == id && ca.UserProfileId == UserId);
        _dbContext.ChoreAssignments.Remove(choreToUnassign);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpGet("{id}/withassigned")]
    [Authorize]
    public IActionResult GetChoresWithAssignAndCompletes(int id)
    {
        return Ok(_dbContext.Chores
                .Include(c => c.ChoreAssignments)
                    .ThenInclude(ca => ca.UserProfile)
                .Include(c => c.ChoreCompletions)
                    .ThenInclude(cc => cc.UserProfile)

                    .Where(c => c.Id == id)
                .Select(c => new ChoreDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Difficulty = c.Difficulty,
                    ChoreFrequencyDays = c.ChoreFrequencyDays,
                    ChoreCompletions = c.ChoreCompletions.OrderBy(cc => cc.CompletedOn).Select(cc => new ChoreCompletionDTO
                    {
                        Id = cc.Id,
                        UserProfileId = cc.UserProfileId,
                        UserProfile = new UserProfileDTO
                        {
                            Id = cc.UserProfile.Id,
                            FirstName = cc.UserProfile.FirstName,
                            LastName = cc.UserProfile.LastName,
                            Address = cc.UserProfile.Address

                        },
                        ChoreId = cc.ChoreId,
                        CompletedOn = cc.CompletedOn
                    }).ToList(),
                    ChoreAssignments = c.ChoreAssignments.Select(ca => new ChoreAssignmentDTO
                    {
                        Id = ca.Id,
                        UserProfileId = ca.UserProfileId,
                        UserProfile = new UserProfileDTO
                        {
                            Id = ca.UserProfile.Id,
                            FirstName = ca.UserProfile.FirstName,
                            LastName = ca.UserProfile.LastName,
                            Address = ca.UserProfile.Address

                        },
                        ChoreId = ca.ChoreId
                    }).ToList()
                })
                .ToList()
                .FirstOrDefault()
        );
    }


    [HttpGet("{id}/mychores")]
    public IActionResult GetMyChores(int id)
    {
        return Ok(_dbContext.UserProfiles
        .Include(u => u.choreAssignments)
            .ThenInclude(ca => ca.Chore)
            .Select(u => new UserProfileDTO
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Address = u.Address,
                ChoreAssignments = u.choreAssignments.Select(ca => new ChoreAssignmentDTO
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
                }).ToList()
            }));

    }


}