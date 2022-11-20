using Microsoft.EntityFrameworkCore;
using ToDoList.Controllers;

namespace ToDoList.Repository;

public class TodoListDbContext : DbContext
{
    public DbSet<CardData> Cards { get; set; }

    public TodoListDbContext()
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        //for firt time;
        //todo: use postgresql
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        var dbPath = System.IO.Path.Join(path, "todo-list.db");
        options.UseSqlite($"Data Source={dbPath}");
    }
    
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CardData>(e =>
        {
            e.ToTable(nameof(Cards));
            e.HasKey(p => p.Id);
            e.Property(p => p.Id).IsRequired();
        });
        //.ToTable("Cards", t => t.ExcludeFromMigrations());
    }
}