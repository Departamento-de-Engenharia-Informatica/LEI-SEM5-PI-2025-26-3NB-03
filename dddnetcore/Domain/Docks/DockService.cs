using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.VesselTypes;

namespace DDDSample1.Domain.Docks
{
    public class DockService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDockRepository _repo;

        private readonly IVesselTypeRepository _repoVT;

        public DockService(IUnitOfWork unitOfWork, IDockRepository repo, IVesselTypeRepository repovt)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoVT = repovt;
        }

        public async Task<List<DockDto>> GetAllAsync() //for testing purposes only
        {
            var list = await this._repo.GetAllAsync();

            List<DockDto> listDto = list.ConvertAll<DockDto>(doc =>
                new DockDto(doc.Id.AsGuid(), doc.Name, doc.Location, doc.Length, doc.Depth, doc.MaxDraft, doc.Capacity, doc.AllowedVesselTypes));

            return listDto;
        }

        //adicionar

        public async Task<DockDto> AddAsync(CreatingDockDto dto)
        {
            // buscar as entidades reais
            var vesselTypes = await _vesselTypeRepository.GetByIdsAsync(vesselTypeIds);

            // criar dock com entidades reais
            var dock = new Dock(dto.Name, dto.Location, dto.Length, dto.Depth, dto.MaxDraft, dto.Capacity, vesselTypes.ToList());

            await _repo.AddAsync(dock);
            await _unitOfWork.CommitAsync();
            
            return ToDto(dock);


        }
        
        public async Task<List<DockDto>> GetByNameAsync(string name)
        {
            var docks = await _repo.GetByNameAsync(name);
            return docks.Select(ToDto).ToList();
        }

        public async Task<List<DockDto>> GetByLocationAsync(string location)
        {
            var docks = await _repo.GetByLocationAsync(location);
            return docks.Select(ToDto).ToList();
        }

        public async Task<List<DockDto>> GetByVesselTypeAsync(Guid vesselTypeId)
        {
            var docks = await _repo.GetByVesselTypeAsync(new VesselTypeId(vesselTypeId));
            return docks.Select(ToDto).ToList();
        }
        
        private static DockDto ToDto(Dock d)
        {
        return new DockDto
        {
            Id = d.Id.AsGuid(),
            Name = d.Name,
            Location = d.Location,
            Length = d.Length,
            Depth = d.Depth,
            MaxDraft = d.MaxDraft,
            Capacity = d.Capacity,
            VesselTypeIds = d.VesselTypes.Select(v => v.Id.AsGuid()).ToList()
        };
    }
}