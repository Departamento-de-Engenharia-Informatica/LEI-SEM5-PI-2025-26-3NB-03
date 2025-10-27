using DDDSample1.Domain.Qualifications;
using DDDSample1.Domain.Representatives;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDSample1.Domain.PhysicalResources
{
    public class PhysicalResourceService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPhysicalResourceRepository _repo;
        private readonly IQualificationRepository _repQ;

        public PhysicalResourceService(IUnitOfWork unitOfWork, IPhysicalResourceRepository repo, IQualificationRepository repQ)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repQ = repQ;
        }

        public async Task<List<PhysicalResourceDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            return list.ConvertAll<PhysicalResourceDto>(resource => new PhysicalResourceDto
            {
                Id = resource.Id.AsGuid(),
                Description = resource.Description,
                OperationalCapacity = resource.OperationalCapacity,
                AvailabilityStatus = resource.AvailabilityStatus,
                SetupTime = resource.SetupTime,
                Qualifications = resource.Qualifications.Select(q => q.Id.AsString()).ToList()
            });
        }

        public async Task<PhysicalResourceDto> GetByIdAsync(PhysicalResourceId id)
        {
            var resource = await this._repo.GetByIdAsync(id);
            
            if(resource == null)
                return null;

            return new PhysicalResourceDto
            {
                Id = resource.Id.AsGuid(),
                Description = resource.Description,
                OperationalCapacity = resource.OperationalCapacity,
                AvailabilityStatus = resource.AvailabilityStatus,
                SetupTime = resource.SetupTime,
                Qualifications = resource.Qualifications.Select(q => q.Id.AsString()).ToList()
            };
        }

        public async Task<PhysicalResourceDto> AddAsync(CreatingPhysicalResourceDto dto)
        {
            if (dto.Qualifications == null || dto.Qualifications.Count == 0)
                throw new BusinessRuleValidationException("A Physical Resource needs at least one Qualification.");

            var qualifications = new List<Qualification>();
            foreach (var quaId in dto.Qualifications.Select(id => new QualificationId(id)))
            {
                var qualification = await _repQ.GetByIdAsync(quaId);
                if (qualification == null)
                    throw new BusinessRuleValidationException($"Qualification {quaId.AsString()} doesn't exist.");
                qualifications.Add(qualification);
            }

            var resource = new PhysicalResource(
                dto.Description,
                dto.OperationalCapacity,
                dto.AvailabilityStatus,
                dto.SetupTime,
                qualifications
            );

            await this._repo.AddAsync(resource);
            await this._unitOfWork.CommitAsync();

            return new PhysicalResourceDto
            {
                Id = resource.Id.AsGuid(),
                Description = resource.Description,
                OperationalCapacity = resource.OperationalCapacity,
                AvailabilityStatus = resource.AvailabilityStatus,
                SetupTime = resource.SetupTime,
                Qualifications = resource.Qualifications.Select(q => q.Id.AsString()).ToList()
            };
        }

        public async Task<PhysicalResourceDto> UpdateAsync(PhysicalResourceDto dto)
        {
            var resource = await this._repo.GetByIdAsync(new PhysicalResourceId(dto.Id)); 

            if (resource == null)
                return null;

            var qualifications = new List<Qualification>();
            foreach (var quaId in dto.Qualifications.Select(id => new QualificationId(id)))
            {
                var qualification = await _repQ.GetByIdAsync(quaId);
                if (qualification == null)
                    throw new BusinessRuleValidationException($"Qualification {quaId.AsString()} doesn't exist.");
                qualifications.Add(qualification);
            }

            // change all field
            resource.ChangeDescription(dto.Description);
            resource.ChangeOperationalCapacity(dto.OperationalCapacity);
            resource.ChangeAvailabilityStatus(dto.AvailabilityStatus);
            resource.ChangeSetupTime(dto.SetupTime);
            resource.ChangeQualifications(qualifications);

            await this._unitOfWork.CommitAsync();

            return new PhysicalResourceDto
            {
                Id = resource.Id.AsGuid(),
                Description = resource.Description,
                OperationalCapacity = resource.OperationalCapacity,
                AvailabilityStatus = resource.AvailabilityStatus,
                SetupTime = resource.SetupTime,
                Qualifications = resource.Qualifications.Select(q => q.Id.AsString()).ToList()
            };
        }

        public async Task<PhysicalResourceDto> InactivateAsync(PhysicalResourceId id)
        {
            var resource = await this._repo.GetByIdAsync(id);

            if (resource == null)
                return null;

            // change all fields
            resource.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new PhysicalResourceDto
            {
                Id = resource.Id.AsGuid(),
                Description = resource.Description,
                OperationalCapacity = resource.OperationalCapacity,
                AvailabilityStatus = resource.AvailabilityStatus,
                SetupTime = resource.SetupTime,
                Qualifications = resource.Qualifications.Select(q => q.Id.AsString()).ToList()
            };
        }
    }
}