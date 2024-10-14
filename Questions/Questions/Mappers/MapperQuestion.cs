using AutoMapper;
using Questions.Dtos;
using Questions.Models;
namespace Questions.Mappers;

public class MapperQuestion : Profile
{
    public MapperQuestion()
    {
        CreateMap<Question, QuestionDto>();
        CreateMap<QuestionDto, Question>();
    }
}
