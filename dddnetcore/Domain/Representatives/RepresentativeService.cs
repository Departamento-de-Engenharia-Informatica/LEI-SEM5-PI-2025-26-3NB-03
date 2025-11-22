using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        public async Task<List<RepresentativeGetDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();

            return list.ConvertAll(rep => new RepresentativeGetDto
            {
                Id = rep.Id.AsString(),
                Name = rep.Name,
                Nationality = rep.Nationality,
                Email = rep.Email,
                PhoneNumber = rep.PhoneNumber,
                ShippingAgentOrganizationId = rep.ShippingAgentOrganizationId?.AsString(),
                Active = rep.Active
            });
        }

        public async Task<RepresentativeGetDto> GetByIdAsync(RepresentativeId id)
        {
            var rep = await _repo.GetByIdAsync(id);

            if (rep == null) return null;

            return new RepresentativeGetDto
            {
                Id = rep.Id.AsString(),
                Name = rep.Name,
                Nationality = rep.Nationality,
                Email = rep.Email,
                PhoneNumber = rep.PhoneNumber,
                ShippingAgentOrganizationId = rep.ShippingAgentOrganizationId?.AsString(),
                Active = rep.Active
            };
        }

        public async Task<RepresentativeGetDto> AddAsync(CreatingRepresentativeDto dto)
        {
            var repId = new RepresentativeId(dto.Id);
            var representative = new Representative(repId, dto.Name, dto.Nationality, dto.Email, dto.PhoneNumber);

            await this._repo.AddAsync(representative);

            await this._unitOfWork.CommitAsync();

            return new RepresentativeGetDto { Id = representative.Id.AsString(), Name = representative.Name, Nationality = representative.Nationality, Email = representative.Email, PhoneNumber = representative.PhoneNumber };
        }

        public async Task<RepresentativeGetDto> UpdateAsync(string id, RepresentativeUpdateDto dto)
        {
            var representative = await _repo.GetByIdAsync(new RepresentativeId(id));

            if (representative == null)
                return null;

            representative.ChangeName(dto.Name);
            representative.ChangeNationality(dto.Nationality);
            representative.ChangeEmail(dto.Email);
            representative.ChangePhoneNumber(dto.PhoneNumber);

            await _unitOfWork.CommitAsync();

            return new RepresentativeGetDto
            {
                Id = representative.Id.AsString(),
                Name = representative.Name,
                Nationality = representative.Nationality,
                Email = representative.Email,
                PhoneNumber = representative.PhoneNumber,
                ShippingAgentOrganizationId = representative.ShippingAgentOrganizationId?.AsString(),
                Active = representative.Active
            };
        }

        public async Task<RepresentativeGetDto> InactivateAsync(RepresentativeId id)
        {
            var representative = await this._repo.GetByIdAsync(id); 

            if (representative == null)
                return null;

            // change all fields
            representative.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new RepresentativeGetDto { Id = representative.Id.AsString(), Name = representative.Name, Nationality = representative.Nationality, Email = representative.Email, PhoneNumber = representative.PhoneNumber };
        }
    }
}