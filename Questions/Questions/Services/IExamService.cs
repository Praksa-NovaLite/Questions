using Questions.Dtos;
namespace Questions.Services;
public interface IExamService
{
    ExamDto Create(ExamDto dto);
    ExamDto Get(long id);
}