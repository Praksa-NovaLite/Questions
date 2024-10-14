using AutoMapper;
using Questions.Crud;
using Questions.Dtos;
using Questions.Models;
namespace Questions.Services;

public class AnswerService : Service<Answer, AnswerDto>
{
    public AnswerService(IRepository<Answer> repository, IMapper mapper) : base(repository, mapper)
    {
    }
}
