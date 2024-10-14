using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Questions.Crud.Domain;
using System.Linq.Expressions;
namespace Questions.Crud;

public class Service<TEntity, TDto> : BaseService<TDto, TEntity>, IBaseService<TDto>
    where TEntity : Entity
    where TDto : class
{
    private readonly IRepository<TEntity> _repository;

    public Service(IRepository<TEntity> repository, IMapper mapper) : base(mapper)
    {
        _repository = repository;
    }

    public TDto? Get(long id)
    {
        var result = _repository.Get(id);
        return result == null ? null : MapToDto(result);
    }
    public virtual TDto Create(TDto dto)
    {
        var entity = MapToDomain(dto);
        _repository.Create(entity);
        _repository.SaveChanges();

        return MapToDto(entity);
    }
    public virtual TDto Update(long id, TDto dto)
    {
        var entity = MapToDomain(dto);
        entity.Id = id;
        _repository.Update(entity);
        _repository.SaveChanges();

        return MapToDto(entity);
    }

    public IEnumerable<TDto> GetAll()
    {
        var result = _repository.GetAll();
        return MapToDto((List<TEntity>)result);
    }


}
