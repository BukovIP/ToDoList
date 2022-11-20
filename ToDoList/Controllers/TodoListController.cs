using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.Repository;

namespace ToDoList.Controllers;

[ApiController]
[Route("[controller]")]
public class TodoListController : ControllerBase
{
    private readonly TodoListDbContext _dbContext;
    private readonly ILogger<TodoListController> _logger;

    public TodoListController(TodoListDbContext dbContext, ILogger<TodoListController> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IEnumerable<CardData>> GetAsync()
    {
        return await _dbContext.Cards.ToListAsync();
    }

    [HttpPost]
    public async Task<CardData> UpdateCardAsync([FromBody] CardData cardData)
    {
        if (cardData == null)
            throw new ArgumentNullException();

        var entity = await _dbContext.Cards.SingleOrDefaultAsync(p => p.Id == cardData.Id);
        
        if (entity == null)
            throw new Exception($"Not found cardData with id {cardData.Id}");
        
        entity.Label = cardData.Label;
        entity.Description = cardData.Description;
        
        /*var entity = await EntityFrameworkQueryableExtensions.SingleOrDefaultAsync((from c in _dbContext.Cards
            where c.Id == cardData.Id
            select c));
        //var entity = await _dbContext.Cards.FirstAsync(p => p.Id == cardData.Id);
        entity.Label = cardData.Label;
        entity.Description = cardData.Description;*/
        
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    [HttpPut]
    public async Task<CardData> CreateCardAsync([FromBody] CardData cardData)
    {
        var entity = _dbContext.Add(cardData);
        await _dbContext.SaveChangesAsync();

        //todo: validate and save to db.
        return entity.Entity;
    }
}

public class CardData
{
    public int Id { get; set; }
    public string Label { get; set; }
    public string Description { get; set; }
}