using DDDSample1.Domain.Docks;
using DDDSample1.Domain.Qualifications;
using DDDSample1.Domain.Shared;
using System;
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
        private readonly IDockRepository _repD;

        public PhysicalResourceService(IUnitOfWork unitOfWork, IPhysicalResourceRepository repo, IQualificationRepository repQ, IDockRepository repD)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repQ = repQ;
            this._repD = repD;
        }

        public async Task<List<PhysicalResourceDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            return list.ConvertAll<PhysicalResourceDto>(resource =>
            {
                resource.CheckAvailability();

                return new PhysicalResourceDto
                {
                    Id = resource.Id.AsGuid(),
                    Code = resource.Code,
                    Type = resource.Type,
                    Description = resource.Description,
                    WeekdayStart = resource.WeekdayStart,
                    WeekdayFinish = resource.WeekdayFinish,
                    WeekendStart = resource.WeekendStart,
                    WeekendFinish = resource.WeekendFinish,
                    ContainerCapacity = resource.ContainerCapacity,
                    AverageSpeed = resource.AverageSpeed,
                    SetupTime = resource.SetupTime,
                    AvailabilityStatus = resource.AvailabilityStatus,
                    Qualifications = resource.Qualifications.Select(q => q.Id.AsString()).ToList(),
                    Dock = resource.AssignedDockId != null ? resource.AssignedDockId.AsGuid() : Guid.Empty
                };
            });
        }

        public async Task<PhysicalResourceDto> GetByIdAsync(PhysicalResourceId id)
        {
            var resource = await this._repo.GetByIdAsync(id);

            if (resource == null)
                return null;

            resource.CheckAvailability();

            return new PhysicalResourceDto
            {
                Id = resource.Id.AsGuid(),
                Code = resource.Code,
                Type = resource.Type,
                Description = resource.Description,
                WeekdayStart = resource.WeekdayStart,
                WeekdayFinish = resource.WeekdayFinish,
                WeekendStart = resource.WeekendStart,
                WeekendFinish = resource.WeekendFinish,
                ContainerCapacity = resource.ContainerCapacity,
                AverageSpeed = resource.AverageSpeed,
                SetupTime = resource.SetupTime,
                AvailabilityStatus = resource.AvailabilityStatus,
                Qualifications = resource.Qualifications.Select(q => q.Id.AsString()).ToList(),
                Dock = resource.AssignedDockId != null ? resource.AssignedDockId.AsGuid() : Guid.Empty
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

            Dock dock = null;
            if (dto.Dock.HasValue && dto.Dock.Value != Guid.Empty)
            {
                var dockId = new DockId(dto.Dock.Value);
                dock = await _repD.GetByIdAsync(dockId);
                if (dock == null)
                    throw new BusinessRuleValidationException($"Dock {dockId.AsString()} doesn't exist.");
            }

            var resource = new PhysicalResource(
                dto.Code,
                dto.Type,
                dto.Description,
                dto.WeekdayStart,
                dto.WeekdayFinish,
                dto.WeekendStart,
                dto.WeekendFinish,
                dto.ContainerCapacity,
                dto.AverageSpeed,
                dto.SetupTime,
                qualifications,
                dock
            );

            await this._repo.AddAsync(resource);
            await this._unitOfWork.CommitAsync();

            return new PhysicalResourceDto
            {
                Id = resource.Id.AsGuid(),
                Code = resource.Code,
                Type = resource.Type,
                Description = resource.Description,
                WeekdayStart = resource.WeekdayStart,
                WeekdayFinish = resource.WeekdayFinish,
                WeekendStart = resource.WeekendStart,
                WeekendFinish = resource.WeekendFinish,
                ContainerCapacity = resource.ContainerCapacity,
                AverageSpeed = resource.AverageSpeed,
                SetupTime = resource.SetupTime,
                AvailabilityStatus = resource.AvailabilityStatus,
                Qualifications = resource.Qualifications.Select(q => q.Id.AsString()).ToList(),
                Dock = resource.AssignedDockId != null ? resource.AssignedDockId.AsGuid() : Guid.Empty
            };
        }

        public async Task<PhysicalResourceDto> UpdateAsync(Guid rId, UpdatingPhysicalResourceDto dto)
        {
            var resource = await this._repo.GetByIdAsync(new PhysicalResourceId(rId)); 

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

            Dock dock = null;
            if (dto.Dock.HasValue && dto.Dock.Value != Guid.Empty)
            {
                var dockId = new DockId(dto.Dock.Value);
                dock = await _repD.GetByIdAsync(dockId);
                if (dock == null)
                    throw new BusinessRuleValidationException($"Dock {dockId.AsString()} doesn't exist.");
            }

            resource.ChangeCode(dto.Code);
            resource.ChangeType(dto.Type);
            resource.ChangeDescription(dto.Description);
            resource.ChangeWeekdayStart(dto.WeekdayStart);
            resource.ChangeWeekdayFinish(dto.WeekdayFinish);
            resource.ChangeWeekendStart(dto.WeekendStart);
            resource.ChangeWeekendFinish(dto.WeekendFinish);
            resource.ChangeContainerCapacity(dto.ContainerCapacity);
            resource.ChangeAverageSpeed(dto.AverageSpeed);
            resource.ChangeSetupTime(dto.SetupTime);
            resource.ChangeQualifications(qualifications);
            resource.ChangeAssignedDock(dock);

            await this._unitOfWork.CommitAsync();

            resource.CheckAvailability();

            return new PhysicalResourceDto
            {
                Id = resource.Id.AsGuid(),
                Code = resource.Code,
                Type = resource.Type,
                Description = resource.Description,
                WeekdayStart = resource.WeekdayStart,
                WeekdayFinish = resource.WeekdayFinish,
                WeekendStart = resource.WeekendStart,
                WeekendFinish = resource.WeekendFinish,
                ContainerCapacity = resource.ContainerCapacity,
                AverageSpeed = resource.AverageSpeed,
                SetupTime = resource.SetupTime,
                AvailabilityStatus = resource.AvailabilityStatus,
                Qualifications = resource.Qualifications.Select(q => q.Id.AsString()).ToList(),
                Dock = resource.AssignedDockId != null ? resource.AssignedDockId.AsGuid() : Guid.Empty
            };
        }

        public async Task<PhysicalResourceDto> InactivateAsync(PhysicalResourceId id)
        {
            var resource = await this._repo.GetByIdAsync(id);

            if (resource == null)
                return null;

            resource.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new PhysicalResourceDto
            {
                Id = resource.Id.AsGuid(),
                Code = resource.Code,
                Type = resource.Type,
                Description = resource.Description,
                WeekdayStart = resource.WeekdayStart,
                WeekdayFinish = resource.WeekdayFinish,
                WeekendStart = resource.WeekendStart,
                WeekendFinish = resource.WeekendFinish,
                ContainerCapacity = resource.ContainerCapacity,
                AverageSpeed = resource.AverageSpeed,
                SetupTime = resource.SetupTime,
                AvailabilityStatus = resource.AvailabilityStatus,
                Qualifications = resource.Qualifications.Select(q => q.Id.AsString()).ToList(),
                Dock = resource.AssignedDockId != null ? resource.AssignedDockId.AsGuid() : Guid.Empty
            };
        }
    }
}
