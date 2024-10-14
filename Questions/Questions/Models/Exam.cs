using Questions.Crud.Domain;
namespace Questions.Models;

public class Exam : Entity
{
    public int CandidateId { get; set; }
    public List<Question> Questions { get; set; }
    public int MaxScore { get; set; }

}
