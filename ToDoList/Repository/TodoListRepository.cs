using ToDoList.Controllers;

namespace ToDoList.Repository;

public class TodoListRepository : ITodoListRepository
{
    public Task<IEnumerable<CardData>> GetCards()
    {
        throw new NotImplementedException();
    }

    public Task CreateCard(CardData cardData)
    {
        throw new NotImplementedException();
    }

    public Task UpdateCard(CardData cardData)
    {
        throw new NotImplementedException();
    }
}