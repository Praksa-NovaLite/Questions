using AutoMapper;
using Questions.Crud;
using Questions.Dtos;
using Questions.Models;
namespace Questions.Services;

public class ExamService : Service<Exam, ExamDto>, IExamService
{

    public ExamService(IRepository<Exam> repository, IMapper mapper) : base(repository, mapper)
    {

    }

}

