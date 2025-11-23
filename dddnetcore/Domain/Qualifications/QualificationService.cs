using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Qualifications
{
    public class QualificationService
    {
        private readonly IQualificationRepository _repo;
        private readonly IUnitOfWork _uow;

        public QualificationService(IQualificationRepository repo, IUnitOfWork uow)
        {
            _repo = repo;
            _uow  = uow;
        }

        public async Task<QualificationViewDto> CreateAsync(CreateQualificationDto dto)
        {
            if (await _repo.ExistsCodeAsync(dto.Code))
                throw new BusinessRuleValidationException("Qualification code must be unique.");

            var q = Qualification.Create(dto.Code, dto.Name);
            await _repo.AddAsync(q);
            await _uow.CommitAsync();

            return new QualificationViewDto { /*Id = q.Id.AsString(), */Code = q.Code, Name = q.Name };
        }

        public async Task<QualificationViewDto> UpdateAsync(string code, UpdateQualificationDto dto)
        {
            var q = await _repo.GetByCodeAsync(code);
            if (q == null) throw new BusinessRuleValidationException("Qualification not found.");

            q.Rename(dto.Name);

            await _uow.CommitAsync();

            return new QualificationViewDto { /*Id = q.Id.AsString(),*/ Code = q.Code, Name = q.Name };
        }

        public async Task<List<QualificationViewDto>> SearchAsync(string code, string name)
        {
            var list = await _repo.SearchAsync(code, name);
            return list.Select(x => new QualificationViewDto { /*Id = x.Id.AsString(),*/ Code = x.Code, Name = x.Name }).ToList();
        }
    }
}