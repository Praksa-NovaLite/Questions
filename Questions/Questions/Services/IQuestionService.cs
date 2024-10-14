using Questions.Dtos;
using Questions.Enums;
namespace Questions.Services;

public interface IQuestionService
{
    ExamDto AddExam(IEnumerable<CategoryType> categoryTypes, ExamDto examDto);
    QuestionDto Create(QuestionDto dto);
    IEnumerable<QuestionDto> GetAll();
    QuestionDto GetById(long id);
    QuestionDto Update(long id, QuestionDto dto);
}