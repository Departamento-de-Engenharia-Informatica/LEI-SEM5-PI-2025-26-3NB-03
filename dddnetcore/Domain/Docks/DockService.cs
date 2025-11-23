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

        //Getall
        public async Task<List<DockDto>> GetAllAsync()
{
    var list = await _dockRepo.GetAllAsync();

    return list
        .Select(dc => new DockDto
        {
            Id = dc.Id.AsGuid(),
            Name = dc.Name,
            LocationX = dc.LocationX,
            LocationZ = dc.LocationZ,
            LocationOrientation = dc.LocationOrientation,
            Length = dc.Length,
            Depth = dc.Depth,
            MaxDraft = dc.MaxDraft,
            Capacity = dc.Capacity,
            VesselTypeIds = dc.VesselTypes.Select(v => v.Id.AsGuid()).ToList()
        })
        .ToList();
}
        // Criar Dock
        public async Task<DockDto> AddAsync(CreatingDockDto dto)
        {
            var vesselTypeIds = dto.VesselTypeIds.Select(g => new VesselTypeId(g)).ToList();
            var vesselTypes = await _vesselTypeRepo.GetByIdsAsync(vesselTypeIds);

            var dock = new Dock(
                dto.Name,
                dto.LocationX,
                dto.LocationZ,
                dto.LocationOrientation,
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

        // Buscar Docks por local
        /*public async Task<List<DockDto>> GetByLocationAsync(float locationx)
        {
            var docks = await _dockRepo.GetByLocationAsync(locationx);
            return docks.Select(ToDto).ToList();
        }*/

        // Buscar Docks por tipo de vessel
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
                LocationX = dock.LocationX,
                LocationZ = dock.LocationZ,
                LocationOrientation = dock.LocationOrientation,
                Length = dock.Length,
                Depth = dock.Depth,
                MaxDraft = dock.MaxDraft,
                Capacity = dock.Capacity,
                VesselTypeIds = dock.VesselTypes.Select(v => v.Id.AsGuid()).ToList()
            };
        }
    }
}
