using Questions.Dtos;
using Questions.Enums;

namespace Questions.Controllers
{
    public class AddExam
    {
        public IEnumerable<CategoryType> categoryTypes { get; set; }
        public ExamDto examDto { get; set; }
    }
}
