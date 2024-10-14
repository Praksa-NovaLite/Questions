using AutoMapper;
using Questions.Crud.Domain;
namespace Questions.Crud;

public abstract class BaseService<TDto, TDomain> where TDomain : Entity
{
    private readonly IMapper _mapper;
    protected BaseService(IMapper mapper)
    {
        _mapper = mapper;
    }
    protected TDomain MapToDomain(TDto dto) => _mapper.Map<TDomain>(dto);
    protected List<TDomain> MapToDomain(List<TDto> dtos) => _mapper.Map<List<TDomain>>(dtos);
    protected TDto MapToDto(TDomain result) => _mapper.Map<TDto>(result);
    protected List<TDto> MapToDto(List<TDomain> result) => result.Select(_mapper.Map<TDto>).ToList();
}
