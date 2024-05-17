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
        .Select(c => new ChoreDTO
        {
            Id = c.Id,
            Name = c.Name,
            Difficulty = c.Difficulty,
            ChoreFrequencyDays = c.ChoreFrequencyDays
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
    // [Authorize(Roles = "Admin")]
    public IActionResult UpdateAChore(Chore chore, int id)
    {
        Chore choreToUpdate = _dbContext.Chores.FirstOrDefault(c => c.Id == id);

        choreToUpdate.Name = chore.Name;
        choreToUpdate.Difficulty = chore.Difficulty;
        choreToUpdate.ChoreFrequencyDays = chore.ChoreFrequencyDays;
        _dbContext.SaveChanges();
        return NoContent();
    }

}