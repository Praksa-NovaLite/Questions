using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Questions.Dtos;
using Questions.Services;
namespace Questions.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class QuestionsController : ControllerBase
{
    private readonly IQuestionService _questionService;

    public QuestionsController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [HttpPost("create")]
    public ActionResult<QuestionDto> Create([FromBody] QuestionDto question) => _questionService.Create(question);

    [HttpGet("{id}")]
    public ActionResult<QuestionDto> GetById(long id) => _questionService.GetById(id);

    [HttpGet]
    public ActionResult<IEnumerable<QuestionDto>> GetAll()
    {
        var result = _questionService.GetAll().ToList();
        return Ok(result);
    }

    [HttpPut("{id}")]
    public ActionResult<QuestionDto> Update(long id, [FromBody] QuestionDto question) => _questionService.Update(id, question);
}