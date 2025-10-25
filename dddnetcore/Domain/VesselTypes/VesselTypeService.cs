using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.VesselTypes
{
    public class VesselTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVesselTypeRepository _repo;

        public VesselTypeService(IUnitOfWork unitOfWork, IVesselTypeRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        //For test only
        public async Task<List<VesselTypeDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<VesselTypeDto> listDto = list.ConvertAll<VesselTypeDto>(vt => new VesselTypeDto { Id = vt.Id.AsGuid(), Name = vt.Name, Description = vt.Description, Capacity = vt.Capacity, MaxBays = vt.MaxBays, MaxRows = vt.MaxRows, MaxTiers = vt.MaxTiers }); //

            return listDto;
        }

        public async Task<VesselTypeDto> GetByNameAsync(string name)
        {
            var vt = await this._repo.GetByNameAsync(name);

            if (vt == null)
                return null;

            return new VesselTypeDto { Id = vt.Id.AsGuid(), Name = vt.Name, Description = vt.Description, Capacity = vt.Capacity, MaxBays = vt.MaxBays, MaxRows = vt.MaxRows, MaxTiers = vt.MaxTiers };
        }
        
        public async Task<VesselTypeDto> GetByDescriptionAsync(string description)
        {
            var vt = await this._repo.GetByDescriptionAsync(description);
            
            if(vt == null)
                return null;

            return new VesselTypeDto{Id = vt.Id.AsGuid(), Name = vt.Name, Description = vt.Description, Capacity = vt.Capacity, MaxBays = vt.MaxBays, MaxRows = vt.MaxRows, MaxTiers = vt.MaxTiers};
        }

        public async Task<VesselTypeDto> AddAsync(CreatingVesselTypeDto dto)
        {
            var vt = new VesselType(dto.Name, dto.Description, dto.Capacity, dto.MaxBays, dto.MaxRows, dto.MaxTiers);

            await this._repo.AddAsync(vt);

            await this._unitOfWork.CommitAsync();

            return new VesselTypeDto {Name = vt.Name, Description = vt.Description, Capacity = vt.Capacity, MaxBays = vt.MaxBays, MaxRows = vt.MaxRows, MaxTiers = vt.MaxTiers};
        }

        
    }
}