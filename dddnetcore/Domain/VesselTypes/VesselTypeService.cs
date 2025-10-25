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

        public async Task<List<VesselTypeDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<VesselTypeDto> listDto = list.ConvertAll<VesselTypeDto>(cat => new VesselTypeDto{Id = cat.Id.AsGuid(), Name = cat.Name});
                                                                                    //string name, string description, int capacity, int maxrows, int maxbays, int maxtiers
            return listDto;
        }

//mudar para getbyname
        public async Task<VesselTypeDto> GetByNameAsync(string name)
        {
            var cat = await this._repo.GetByNameAsync(name);
            
            if(cat == null)
                return null;

            return new VesselTypeDto{Id = cat.Id.AsGuid(), Description = cat.Description}; // rever com dados de VesselType
        }

   public async Task<VesselTypeDto> GetByDescriptionAsync(VesselTypeId string description)
        {
            var cat = await this._repo.GetByIdAsync(id);
            
            if(cat == null)
                return null;

            return new VesselTypeDto{Id = cat.Id.AsGuid(), Description = cat.Description}; // rever com dados de VesselType
        }


        public async Task<VesselTypeDto> AddAsync(CreatingVesselTypeDto dto)
        {
            var vesseltype = new VesselType(dto.Description); // rever com dados Vessel Type

            await this._repo.AddAsync(vesseltype);

            await this._unitOfWork.CommitAsync();

            return new CategoryDto { Id = category.Id.AsGuid(), Description = category.Description }; // rever com dados Vessel Type
        }

        /*public async Task<VesselTypeDto> UpdateAsync(VesselTypeDto dto)
        {
            var category = await this._repo.GetByIdAsync(new CategoryId(dto.Id));

            if (category == null)
                return null;   

            // change all field
            category.ChangeDescription(dto.Description);
            
            await this._unitOfWork.CommitAsync();

            return new CategoryDto { Id = category.Id.AsGuid(), Description = category.Description };
        }

        public async Task<CategoryDto> InactivateAsync(CategoryId id)
        {
            var category = await this._repo.GetByIdAsync(id); 

            if (category == null)
                return null;   

            // change all fields
            category.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new CategoryDto { Id = category.Id.AsGuid(), Description = category.Description };
        }

         public async Task<CategoryDto> DeleteAsync(CategoryId id)
        {
            var category = await this._repo.GetByIdAsync(id); 

            if (category == null)
                return null;   

            if (category.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active category.");
            
            this._repo.Remove(category);
            await this._unitOfWork.CommitAsync();

            return new CategoryDto { Id = category.Id.AsGuid(), Description = category.Description };
        }*/
    }
}