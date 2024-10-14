using Microsoft.EntityFrameworkCore;
using Questions.Context;
using Questions.Crud.Domain;
using System.Linq.Expressions;
namespace Questions.Crud;

public class DatabaseRepository<TEntity> : IRepository<TEntity>
    where TEntity : Entity
{
    protected readonly QuestionsContext DbContext;
    private readonly DbSet<TEntity> _dbSet;
    public DatabaseRepository(QuestionsContext dbContext)
    {
        DbContext = dbContext;
        _dbSet = DbContext.Set<TEntity>();
    }
    public TEntity? Get(long id) => _dbSet.Find(id);
    public void Create(TEntity entity) => _dbSet.Add(entity);
    public IEnumerable<TEntity> GetAll() => _dbSet.ToList();
    public void SaveChanges() => DbContext.SaveChanges();
    public TEntity Update(TEntity entity)
    {
        _dbSet.Update(entity);
        return entity;
    }
    public IEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> predicate) => _dbSet.Where(predicate);
    public IQueryable<TEntity> Include(params Expression<Func<TEntity, object>>[] includes)
    {
        IQueryable<TEntity> query = _dbSet;

        foreach (var include in includes)
        {
            query = query.Include(include);
        }

        return query;
    }
}