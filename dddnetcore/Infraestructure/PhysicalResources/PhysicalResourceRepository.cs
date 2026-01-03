using DDDSample1.Domain.PhysicalResources;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDSample1.Infrastructure.PhysicalResources
{
    public class PhysicalResourceRepository : BaseRepository<PhysicalResource, PhysicalResourceId>, IPhysicalResourceRepository
    {
        private readonly DDDSample1DbContext _context;

        public PhysicalResourceRepository(DDDSample1DbContext context):base(context.PhysicalResources)
        {
            _context = context;
        }

        public new async Task<List<PhysicalResource>> GetAllAsync()
        {
            var physicalResources = await _context.PhysicalResources.ToListAsync();

            var physicalResourceQualifications = await _context.PhysicalResourceQualifications.ToListAsync();

            var qualifications = await _context.Qualifications.ToListAsync();

            foreach (var pr in physicalResources)
            {
                var qualificationsRelacionados = physicalResourceQualifications
                    .Where(prq => prq.PhysicalResourceId == pr.Id)
                    .ToList();

                foreach (var prq in qualificationsRelacionados)
                {
                    var qualificationInstance = qualifications.FirstOrDefault(q => q.Code == prq.QualificationCode);
                    if (qualificationInstance != null)
                    {
                        var physicalResourceQualification = new PhysicalResourceQualification(prq.PhysicalResourceId, qualificationInstance.Code)
                        {
                            Qualification = qualificationInstance
                        };
                        pr.AddQualification(physicalResourceQualification);
                    }
                }
            }

            return physicalResources;
        }

        public new async Task<PhysicalResource> GetByIdAsync(PhysicalResourceId id)
        {
            var pr = await _context.PhysicalResources.FirstOrDefaultAsync(x => x.Id == id);
            if (pr == null) return null;

            var qualificationsRelacionados = await _context.PhysicalResourceQualifications
                .Where(prq => prq.PhysicalResourceId == pr.Id)
                .ToListAsync();

            var allQualifications = await _context.Qualifications.ToListAsync();

            foreach (var prq in qualificationsRelacionados)
            {
                var qualificationInstance = allQualifications.FirstOrDefault(q => q.Code == prq.QualificationCode);
                if (qualificationInstance != null)
                {
                    var physicalResourceQualification = new PhysicalResourceQualification(prq.PhysicalResourceId, qualificationInstance.Code)
                    {
                        Qualification = qualificationInstance
                    };
                    pr.AddQualification(physicalResourceQualification);
                }
            }

            return pr;
        }

        public async Task<PhysicalResource> GetByCodeAsync(string code)
        {
            /*return await _context.PhysicalResources
                .Include(o => o.Qualifications)
                .FirstOrDefaultAsync(o => o.Code == code);*/
            var pr = await _context.PhysicalResources.FirstOrDefaultAsync(o => o.Code == code);
            if (pr == null) return null;

            var qualificationsRelacionados = await _context.PhysicalResourceQualifications
                .Where(prq => prq.PhysicalResourceId == pr.Id)
                .ToListAsync();

            var allQualifications = await _context.Qualifications.ToListAsync();

            foreach (var prq in qualificationsRelacionados)
            {
                var qualificationInstance = allQualifications.FirstOrDefault(q => q.Code == prq.QualificationCode);
                if (qualificationInstance != null)
                {
                    var physicalResourceQualification = new PhysicalResourceQualification(prq.PhysicalResourceId, qualificationInstance.Code)
                    {
                        Qualification = qualificationInstance
                    };
                    pr.AddQualification(physicalResourceQualification);
                }
            }

            return pr;
        }

        public async Task<List<PhysicalResource>> SearchAsync(
            string code = null,
            string description = null,
            string type = null,
            string availabilityStatus = null)
        {
            /*var query = _context.PhysicalResources
                .Include(o => o.Qualifications)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(code))
                query = query.Where(r => r.Code.Contains(code));

            if (!string.IsNullOrWhiteSpace(description))
                query = query.Where(r => r.Description.Contains(description));

            if (!string.IsNullOrWhiteSpace(type))
                query = query.Where(r => r.Type.Contains(type));

            if (!string.IsNullOrWhiteSpace(availabilityStatus))
                query = query.Where(r => r.AvailabilityStatus.Contains(availabilityStatus));

            return await query.ToListAsync();*/
            var query = _context.PhysicalResources.AsQueryable();

            if (!string.IsNullOrWhiteSpace(code))
                query = query.Where(r => r.Code.Contains(code));

            if (!string.IsNullOrWhiteSpace(description))
                query = query.Where(r => r.Description.Contains(description));

            if (!string.IsNullOrWhiteSpace(type))
                query = query.Where(r => r.Type.Contains(type));

            if (!string.IsNullOrWhiteSpace(availabilityStatus))
                query = query.Where(r => r.AvailabilityStatus.Contains(availabilityStatus));

            var physicalResources = await query.ToListAsync();

            var allQualifications = await _context.Qualifications.ToListAsync();
            var allPhysicalResourceQualifications = await _context.PhysicalResourceQualifications.ToListAsync();

            foreach (var pr in physicalResources)
            {
                var qualificationsRelacionados = allPhysicalResourceQualifications
                    .Where(prq => prq.PhysicalResourceId == pr.Id)
                    .ToList();

                foreach (var prq in qualificationsRelacionados)
                {
                    var qualificationInstance = allQualifications.FirstOrDefault(q => q.Code == prq.QualificationCode);
                    if (qualificationInstance != null)
                    {
                        var physicalResourceQualification = new PhysicalResourceQualification(prq.PhysicalResourceId, qualificationInstance.Code)
                        {
                            Qualification = qualificationInstance
                        };
                        pr.AddQualification(physicalResourceQualification);
                    }
                }
            }

            return physicalResources;
        }
    }
}
