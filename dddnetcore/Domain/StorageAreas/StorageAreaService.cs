using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.StorageAreas
{
    public class StorageAreaService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IStorageAreaRepository _repo;

        public StorageAreaService(IUnitOfWork unitOfWork, IStorageAreaRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<StorageAreaDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            return list.ConvertAll<StorageAreaDto>(storageArea => new StorageAreaDto {
                Id = storageArea.Id.AsGuid(),
                Type = storageArea.Type,
                Location = storageArea.Location,
                MaximumCapacity = storageArea.MaximumCapacity,
                CurrentOccupancy = storageArea.CurrentOccupancy
            });
        }

        public async Task<StorageAreaDto> GetByIdAsync(StorageAreaId id)
        {
            var storageArea = await this._repo.GetByIdAsync(id);
            
            if(storageArea == null)
                return null;

            return new StorageAreaDto {
                Id = storageArea.Id.AsGuid(),
                Type = storageArea.Type,
                Location = storageArea.Location,
                MaximumCapacity = storageArea.MaximumCapacity,
                CurrentOccupancy = storageArea.CurrentOccupancy
            };
        }

        public async Task<StorageAreaDto> AddAsync(CreatingStorageAreaDto dto)
        {
            var storageArea = new StorageArea(dto.Type, dto.Location, dto.MaximumCapacity, dto.CurrentOccupancy);

            await this._repo.AddAsync(storageArea);
            await this._unitOfWork.CommitAsync();

            return new StorageAreaDto {
                Id = storageArea.Id.AsGuid(),
                Type = storageArea.Type,
                Location = storageArea.Location,
                MaximumCapacity = storageArea.MaximumCapacity,
                CurrentOccupancy = storageArea.CurrentOccupancy
            };
        }

        public async Task<StorageAreaDto> UpdateAsync(StorageAreaDto dto)
        {
            var storageArea = await this._repo.GetByIdAsync(new StorageAreaId(dto.Id)); 

            if (storageArea == null)
                return null;

            // change all field
            storageArea.ChangeType(dto.Type);
            storageArea.ChangeLocation(dto.Location);
            storageArea.ChangeMaximumCapacity(dto.MaximumCapacity);
            storageArea.ChangeCurrentOccupancy(dto.CurrentOccupancy);

            await this._unitOfWork.CommitAsync();

            return new StorageAreaDto {
                Id = storageArea.Id.AsGuid(),
                Type = storageArea.Type,
                Location = storageArea.Location,
                MaximumCapacity = storageArea.MaximumCapacity,
                CurrentOccupancy = storageArea.CurrentOccupancy
            };
        }
    }
}