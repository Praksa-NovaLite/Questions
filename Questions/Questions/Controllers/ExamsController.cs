using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Questions.Dtos;
using Questions.Services;
namespace Questions.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExamsController : ControllerBase
{
    private readonly IExamService _examService;
    private readonly IQuestionService _questionService;
    private readonly IPublishEndpoint _publishEndpoint;

    public ExamsController(IExamService examService, IQuestionService questionService, IPublishEndpoint publishEndpoint)
    {
        _examService = examService;
        _questionService = questionService;
        _publishEndpoint = publishEndpoint;
    }
    [HttpPost("add")]
    public async Task<IActionResult> AddExam([FromBody] AddExam addExam, CancellationToken cancellationToken)
    {

        ExamDto examDto = _questionService.AddExam(addExam.categoryTypes, addExam.examDto);

        await _publishEndpoint.Publish(
            examDto,
            cancellationToken);

        var addedExam = _examService.Create(examDto);

        return Ok(addedExam);
    }


    [HttpGet]
    public ActionResult<ExamDto> Get(long id)
    {
        var result = _examService.Get(id);
        return Ok(result);
    }
}
