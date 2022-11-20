using ToDoList.Controllers;

namespace ToDoList.Repository;

public interface ITodoListRepository
{
    Task<IEnumerable<CardData>> GetCards();
    Task CreateCard(CardData cardData);
    Task UpdateCard(CardData cardData);
}