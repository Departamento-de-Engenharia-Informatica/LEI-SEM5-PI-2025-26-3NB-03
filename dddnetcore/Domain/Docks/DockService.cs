using DDDSample1.Domain.Shared;
using DDDSample1.Domain.VesselTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Docks
{
    public class DockService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDockRepository _dockRepo;
        private readonly IVesselTypeRepository _vesselTypeRepo;

        public DockService(IUnitOfWork unitOfWork, IDockRepository dockRepo, IVesselTypeRepository vesselTypeRepo)
        {
            _unitOfWork = unitOfWork;
            _dockRepo = dockRepo;
            _vesselTypeRepo = vesselTypeRepo;
        }

        // Criar Dock
        public async Task<DockDto> AddAsync(CreatingDockDto dto)
        {
            var vesselTypeIds = dto.VesselTypeIds.Select(g => new VesselTypeId(g)).ToList();
            var vesselTypes = await _vesselTypeRepo.GetByIdsAsync(vesselTypeIds);

            var dock = new Dock(
                dto.Name,
                dto.Location,
                dto.Length,
                dto.Depth,
                dto.MaxDraft,
                dto.Capacity,
                vesselTypes.ToList()
            );

            await _dockRepo.AddAsync(dock);
            await _unitOfWork.CommitAsync();

            return ToDto(dock);
        }

        // Buscar Dock por Id
        public async Task<DockDto?> GetByIdAsync(Guid id)
        {
            var dock = await _dockRepo.GetByIdAsync(new DockId(id));
            return dock == null ? null : ToDto(dock);
        }

        // Buscar Docks por nome
        public async Task<List<DockDto>> GetByNameAsync(string name)
        {
            var docks = await _dockRepo.GetByNameAsync(name);
            return docks.Select(ToDto).ToList();
        }

        // Buscar Docks por localização
        public async Task<List<DockDto>> GetByLocationAsync(string location)
        {
            var docks = await _dockRepo.GetByLocationAsync(location);
            return docks.Select(ToDto).ToList();
        }

        // Buscar Docks por tipo de embarcação
        public async Task<List<DockDto>> GetByVesselTypeAsync(Guid vesselTypeId)
        {
            var docks = await _dockRepo.GetByVesselTypeAsync(new VesselTypeId(vesselTypeId));
            return docks.Select(ToDto).ToList();
        }

        // Converter Dock para DockDto
        private static DockDto ToDto(Dock dock)
        {
            return new DockDto
            {
                Id = dock.Id.AsGuid(),
                Name = dock.Name,
                Location = dock.Location,
                Length = dock.Length,
                Depth = dock.Depth,
                MaxDraft = dock.MaxDraft,
                Capacity = dock.Capacity,
                VesselTypeIds = dock.VesselTypes.Select(v => v.Id.AsGuid()).ToList()
            };
        }
    }
}
