using AutoMapper;
using MassTransit;
using Questions.Crud;
using Questions.Dtos;
using Questions.Enums;
using Questions.Models;
namespace Questions.Services;

public class QuestionService : Service<Question, QuestionDto>, IQuestionService
{
    private readonly IRepository<Question> _repository;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;
    public QuestionService(IRepository<Question> repository, IMapper mapper, IPublishEndpoint publishEndpoint) : base(repository, mapper)
    {
        _repository = repository;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }
    public ExamDto AddExam(IEnumerable<CategoryType> categoryTypes, ExamDto examDto)
    {
        var maxScorePerCategory = 100 / categoryTypes.Count();
        examDto.CandidateId = 1;

        foreach (var category in categoryTypes)
        {
            var random = new Random();
            int totalScoreForCategory = 0;
            var filteredQuestions = _repository.Where(q => q.Category == category).ToList();
            while (totalScoreForCategory < maxScorePerCategory)
            {

                var randomQuestion = filteredQuestions[random.Next(filteredQuestions.Count)];
                if (totalScoreForCategory + randomQuestion.Score <= maxScorePerCategory && !examDto.Questions.Any(q => q.Id == randomQuestion.Id))
                {
                    examDto.Questions.Add(randomQuestion);
                    totalScoreForCategory += randomQuestion.Score;
                    examDto.MaxScore += randomQuestion.Score;
                }
            }
        }
        return examDto;
    }

    public QuestionDto GetById(long id)
    {
        var result = _repository.Include(q => q.Answers)
                                .FirstOrDefault(q => q.Id == id);

        return _mapper.Map<QuestionDto>(result);
    }


}