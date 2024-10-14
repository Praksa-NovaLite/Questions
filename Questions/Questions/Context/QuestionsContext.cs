using Microsoft.EntityFrameworkCore;
using Questions.Models;
namespace Questions.Context;

public class QuestionsContext : DbContext
{
    public QuestionsContext(DbContextOptions options) : base(options) { }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Exam> Exams { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Exam>()
            .HasMany(e => e.Questions)
            .WithMany();
    }
}
