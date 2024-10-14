using Questions.Crud.Domain;
using System.Linq.Expressions;
namespace Questions.Crud;

public interface IRepository<TEntity> where TEntity : Entity
{
    TEntity? Get(long id);
    void SaveChanges();
    void Create(TEntity entity);
    IEnumerable<TEntity> GetAll();
    TEntity Update(TEntity entity);
    IEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> predicate);
    public IQueryable<TEntity> Include(params Expression<Func<TEntity, object>>[] includes);
}