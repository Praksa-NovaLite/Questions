using Questions.Crud.Domain;
using Questions.Enums;
namespace Questions.Models;

public class Question : Entity
{
    public string Title { get; set; } = string.Empty;
    public CategoryType Category { get; set; }
    public AnswerType Type { get; set; }
    public int Score { get; set; }
    public List<Answer> Answers { get; set; }

}