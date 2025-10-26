using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Representatives
{
    public class RepresentativeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepresentativeRepository _repo;

        public RepresentativeService(IUnitOfWork unitOfWork, IRepresentativeRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<RepresentativeDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<RepresentativeDto> listDto = list.ConvertAll<RepresentativeDto>(representative => new RepresentativeDto { Id = representative.Id.AsString(), Name = representative.Name, Nationality = representative.Nationality, Email = representative.Email, PhoneNumber = representative.PhoneNumber });

            return listDto;
        }

        public async Task<RepresentativeDto> GetByIdAsync(RepresentativeId id)
        {
            var representative = await this._repo.GetByIdAsync(id);
            
            if(representative == null)
                return null;

            return new RepresentativeDto { Id = representative.Id.AsString(), Name = representative.Name, Nationality = representative.Nationality, Email = representative.Email, PhoneNumber = representative.PhoneNumber };
        }

        public async Task<RepresentativeDto> AddAsync(CreatingRepresentativeDto dto)
        {
            var repId = new RepresentativeId(dto.Id);
            var representative = new Representative(repId, dto.Name, dto.Nationality, dto.Email, dto.PhoneNumber);

            await this._repo.AddAsync(representative);

            await this._unitOfWork.CommitAsync();

            return new RepresentativeDto { Id = representative.Id.AsString(), Name = representative.Name, Nationality = representative.Nationality, Email = representative.Email, PhoneNumber = representative.PhoneNumber };
        }

        public async Task<RepresentativeDto> UpdateAsync(RepresentativeDto dto)
        {
            var representative = await this._repo.GetByIdAsync(new RepresentativeId(dto.Id)); 

            if (representative == null)
                return null;

            // change all field
            representative.ChangeName(dto.Name);
            representative.ChangeNationality(dto.Nationality);
            representative.ChangeEmail(dto.Email);
            representative.ChangePhoneNumber(dto.PhoneNumber);

            await this._unitOfWork.CommitAsync();

            return new RepresentativeDto { Id = representative.Id.AsString(), Name = representative.Name, Nationality = representative.Nationality, Email = representative.Email, PhoneNumber = representative.PhoneNumber };
        }

        public async Task<RepresentativeDto> InactivateAsync(RepresentativeId id)
        {
            var representative = await this._repo.GetByIdAsync(id); 

            if (representative == null)
                return null;

            // change all fields
            representative.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new RepresentativeDto { Id = representative.Id.AsString(), Name = representative.Name, Nationality = representative.Nationality, Email = representative.Email, PhoneNumber = representative.PhoneNumber };
        }
    }
}