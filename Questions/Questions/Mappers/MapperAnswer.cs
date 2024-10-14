using AutoMapper;
using Questions.Dtos;
using Questions.Models;
namespace Questions.Mappers;

public class MapperAnswer : Profile
{
    public MapperAnswer()
    {
        CreateMap<Answer, AnswerDto>();
        CreateMap<AnswerDto, Answer>();
    }
}
