using DDDSample1.Domain.Representatives;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.ShippingAgentOrganizations;

namespace DDDSample1.Domain.ShippingAgentOrganizations
{
    public class ShippingAgentOrganizationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IShippingAgentOrganizationRepository _repo;
        private readonly IRepresentativeRepository _repRepo;

        public ShippingAgentOrganizationService(IUnitOfWork unitOfWork, IShippingAgentOrganizationRepository repo, IRepresentativeRepository repRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repRepo = repRepo;
        }

        public async Task<List<ShippingAgentOrganizationDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            return list.ConvertAll<ShippingAgentOrganizationDto>(organization => new ShippingAgentOrganizationDto
            {
                Id = organization.Id.AsGuid(),
                LegalName = organization.LegalName,
                AltName = organization.AltName,
                Address = organization.Address,
                TaxNumber = organization.TaxNumber,
                Representatives = organization.Representatives.Select(r => r.Id.AsString()).ToList()
            });
        }

        public async Task<ShippingAgentOrganizationDto> GetByIdAsync(ShippingAgentOrganizationId id)
        {
            var organization = await this._repo.GetByIdAsync(id);
            
            if(organization == null)
                return null;

            return new ShippingAgentOrganizationDto
            {
                Id = organization.Id.AsGuid(),
                LegalName = organization.LegalName,
                AltName = organization.AltName,
                Address = organization.Address,
                TaxNumber = organization.TaxNumber,
                Representatives = organization.Representatives.Select(r => r.Id.AsString()).ToList()
            };
        }

        public async Task<ShippingAgentOrganizationDto> AddAsync(CreatingShippingAgentOrganizationDto dto)
        {
            if (dto.Representatives == null || dto.Representatives.Count == 0)
                throw new BusinessRuleValidationException("A Shipping Agent Organization needs at least one Representative.");

            var representatives = new List<Representative>();
            foreach (var repId in dto.Representatives.Select(id => new RepresentativeId(id)))
            {
                var rep = await _repRepo.GetByIdAsync(repId);
                if (rep == null)
                    throw new BusinessRuleValidationException($"Representative {repId.AsString()} doesn't exist.");
                representatives.Add(rep);
            }

            var organization = new ShippingAgentOrganization(
                dto.LegalName,
                dto.AltName,
                dto.Address,
                dto.TaxNumber,
                representatives
            );

            await this._repo.AddAsync(organization);

            await this._unitOfWork.CommitAsync();

            return new ShippingAgentOrganizationDto
            {
                Id = organization.Id.AsGuid(),
                LegalName = organization.LegalName,
                AltName = organization.AltName,
                Address = organization.Address,
                TaxNumber = organization.TaxNumber,
                Representatives = organization.Representatives.Select(r => r.Id.AsString()).ToList()
            };
        }

        public async Task<ShippingAgentOrganizationDto> UpdateAsync(Guid id, UpdateShippingAgentOrganizationDto dto)
        {
            var organization = await this._repo.GetByIdAsync(new ShippingAgentOrganizationId(id)); 

            if (organization == null)
                return null;

            var representatives = new List<Representative>();
            foreach (var repId in dto.Representatives.Select(id => new RepresentativeId(id)))
            {
                var rep = await _repRepo.GetByIdAsync(repId);
                if (rep == null)
                    throw new BusinessRuleValidationException($"Representative {repId.AsString()} doesn't exist.");
                representatives.Add(rep);
            }

            organization.ChangeLegalName(dto.LegalName);
            organization.ChangeAltName(dto.AltName);
            organization.ChangeAddress(dto.Address);
            organization.ChangeTaxNumber(dto.TaxNumber);
            organization.ChangeRepresentatives(representatives);

            await this._unitOfWork.CommitAsync();

            return new ShippingAgentOrganizationDto
            {
                Id = organization.Id.AsGuid(),
                LegalName = organization.LegalName,
                AltName = organization.AltName,
                Address = organization.Address,
                TaxNumber = organization.TaxNumber,
                Representatives = organization.Representatives.Select(r => r.Id.AsString()).ToList()
            };
        }
    }
}