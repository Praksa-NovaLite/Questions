using Microsoft.AspNetCore.Mvc;
using Questions.Crud;
using Questions.Dtos;
namespace Questions.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AnswersController : ControllerBase
{
    private readonly IBaseService<AnswerDto> _answerService;

    public AnswersController(IBaseService<AnswerDto> answerService)
    {
        _answerService = answerService;
    }

    [HttpPost("add-answer")]
    public ActionResult<AnswerDto> AddAnswer([FromBody] AnswerDto answerDto) => _answerService.Create(answerDto);
}
