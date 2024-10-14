using Questions.Crud.Domain;
namespace Questions.Models;

public class Answer : Entity
{
    public long QuestionId { get; set; }
    public string AnswerName { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
}