using Questions.Enums;
using Questions.Models;
namespace Questions.Dtos;

public class QuestionDto
{
    public long Id { get; set; }
    public required string Title { get; set; }
    public required CategoryType Category { get; set; }
    public required AnswerType Type { get; set; }
    public required int Score { get; set; }
    public List<AnswerDto> Answers { get; set; }
}