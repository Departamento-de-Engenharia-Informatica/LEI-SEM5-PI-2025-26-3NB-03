using DDDSample1.Domain.Docks;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDSample1.Domain.StorageAreas
{
    public class StorageAreaService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IStorageAreaRepository _repo;
        private readonly IDockRepository _dockRepo;

        public StorageAreaService(IUnitOfWork unitOfWork, IStorageAreaRepository repo, IDockRepository dockRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._dockRepo = dockRepo;
        }

        private StorageAreaDto ToDto(StorageArea storageArea)
        {
            return new StorageAreaDto
            {
                Id = storageArea.Id.AsGuid(),
                Type = storageArea.Type,
                LocationX = storageArea.LocationX,
                LocationZ = storageArea.LocationZ,
                LocationOrientation = storageArea.LocationOrientation,
                MaximumCapacity = storageArea.MaximumCapacity,
                CurrentOccupancy = storageArea.CurrentOccupancy,
                Docks = storageArea.Docks.Select(d => d.Id.AsGuid()).ToList()
            };
        }

        public async Task<List<StorageAreaDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            return list.ConvertAll<StorageAreaDto>(storageArea => ToDto(storageArea));
        }

        public async Task<StorageAreaDto> GetByIdAsync(StorageAreaId id)
        {
            var storageArea = await this._repo.GetByIdAsync(id);
            
            if(storageArea == null)
                return null;

            return ToDto(storageArea);
        }

        public async Task<StorageAreaDto> AddAsync(CreatingStorageAreaDto dto)
        {
            var dockIds = dto.Docks.Select(g => new DockId(g)).ToList();
            var docks = await this._dockRepo.GetByIdsAsync(dockIds);

            if (dto.Docks.Count != docks.Count)
            {
                if (dto.Docks.Count > 0)
                {
                    throw new BusinessRuleValidationException("One or more Dock IDs provided are invalid or do not exist.");
                }
            }

            var storageArea = new StorageArea(
                dto.Type,
                dto.LocationX,
                dto.LocationZ,
                dto.LocationOrientation,
                dto.MaximumCapacity,
                dto.CurrentOccupancy,
                docks
            );

            await this._repo.AddAsync(storageArea);
            await this._unitOfWork.CommitAsync();

            return ToDto(storageArea);
        }

        public async Task<StorageAreaDto> UpdateAsync(Guid id, UpdateStorageAreaDto dto)
        {
            var storageArea = await _repo.GetByIdAsync(new StorageAreaId(id));

            if (storageArea == null)
                return null;

            var newDockIds = dto.Docks?.Select(d => new DockId(d)).ToList() ?? new List<DockId>();
            var newDocks = await _dockRepo.GetByIdsAsync(newDockIds);

            if (dto.Docks != null && dto.Docks.Count != newDocks.Count)
            {
                throw new BusinessRuleValidationException("One or more Dock IDs provided are invalid or do not exist.");
            }

            storageArea.ChangeType(dto.Type);
            storageArea.ChangeLocationX(dto.LocationX);
            storageArea.ChangeLocationZ(dto.LocationZ);
            storageArea.ChangeLocationOrientation(dto.LocationOrientation);
            storageArea.ChangeMaximumCapacity(dto.MaximumCapacity);
            storageArea.ChangeCurrentOccupancy(dto.CurrentOccupancy);
            storageArea.ChangeDocks(newDocks);

            await _unitOfWork.CommitAsync();

            return ToDto(storageArea);
        }
    }
}
