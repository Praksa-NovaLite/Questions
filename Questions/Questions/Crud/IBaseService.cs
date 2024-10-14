namespace Questions.Crud;
public interface IBaseService<TDto>
{
    TDto Create(TDto dto);
    IEnumerable<TDto> GetAll();
    TDto Update(long id, TDto dto);
}