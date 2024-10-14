using Questions.Models;
namespace Questions.Dtos;

public class ExamDto
{
    public required int CandidateId { get; set; }
    public required List<Question> Questions { get; set; }
    public required int MaxScore { get; set; }

}