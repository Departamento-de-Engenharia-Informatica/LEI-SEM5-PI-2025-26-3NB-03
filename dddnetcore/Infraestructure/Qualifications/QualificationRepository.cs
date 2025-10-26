using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Qualifications;

namespace DDDSample1.Infrastructure.Qualifications
{
    public class QualificationRepository : IQualificationRepository
    {
        private readonly DDDSample1DbContext _ctx;

        public QualificationRepository(DDDSample1DbContext ctx)
        {
            _ctx = ctx;
        }

        // ---- Métodos do IRepository<Qualification, QualificationId> ----

        public async Task<List<Qualification>> GetAllAsync()
            => await _ctx.Qualifications.AsNoTracking().ToListAsync();

        public async Task<Qualification> GetByIdAsync(QualificationId id)
            => await _ctx.Qualifications.FirstOrDefaultAsync(x => x.Id.Equals(id));

        public async Task<List<Qualification>> GetByIdsAsync(List<QualificationId> ids)
            => await _ctx.Qualifications.Where(x => ids.Contains(x.Id)).ToListAsync();

        public async Task<Qualification> AddAsync(Qualification entity)
        {
            var entry = await _ctx.Qualifications.AddAsync(entity);
            return entry.Entity;
        }

        public void Remove(Qualification entity)
            => _ctx.Qualifications.Remove(entity);

        // ---- Métodos extra do IQualificationRepository ----

        public async Task<Qualification> GetByCodeAsync(string code)
            => await _ctx.Qualifications
                         .FirstOrDefaultAsync(q => q.Code.ToLower() == code.ToLower());

        public async Task<bool> ExistsCodeAsync(string code)
            => await _ctx.Qualifications.AnyAsync(q => q.Code.ToLower() == code.ToLower());

        public async Task<List<Qualification>> SearchAsync(string code, string name)
        {
            var qry = _ctx.Qualifications.AsQueryable();

            if (!string.IsNullOrWhiteSpace(code))
                qry = qry.Where(q => q.Code.ToLower().Contains(code.ToLower()));

            if (!string.IsNullOrWhiteSpace(name))
                qry = qry.Where(q => q.Name.ToLower().Contains(name.ToLower()));

            return await qry.OrderBy(q => q.Code).ToListAsync();
        }
    }
}
