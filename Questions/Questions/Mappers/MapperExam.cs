using AutoMapper;
using Questions.Dtos;
using Questions.Models;
namespace Questions.Mappers;

public class MapperExam : Profile
{
    public MapperExam()
    {
        CreateMap<Exam, ExamDto>();
        CreateMap<ExamDto, Exam>();
    }
}

