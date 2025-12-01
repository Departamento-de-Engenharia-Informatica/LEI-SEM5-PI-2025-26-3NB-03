
using DDDNetCore.Controllers.Vessels;
using DDDNetCore.Domain.Vessels;
using DDDNetCore.Domain.Vessels.ValueObjects;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// Assumindo que o IVesselRepository está no seu construtor
[Route("api/[controller]")]
[ApiController]
public class VesselsController : ControllerBase
{
    private readonly IVesselRepository _vesselRepo;

    // Injeção de Dependência: O ASP.NET Core fornece a implementação do IVesselRepository
    public VesselsController(IVesselRepository vesselRepo)
    {
        _vesselRepo = vesselRepo;
    }

    // GET: api/Vessels (Para listar todos os navios)
    [HttpGet]
    public ActionResult<IEnumerable<VesselDto>> GetAll()
    {
        var vessels = _vesselRepo.GetAll();

        // Mapear Entidade para DTO antes de enviar
        var vesselDtos = vessels.Select(v => new VesselDto
        {
            Id = v.Id,
            ImoNumber = v.ImoNumber.Value,
            Name = v.Name,
            VesselType = v.VesselType,
            Operator = v.Operator
        });

        return Ok(vesselDtos);
    }

    // GET: api/Vessels/IMO9074729 (Para procurar por IMO Number)
    [HttpGet("{imoNumber}")]
    public ActionResult<VesselDto> GetByImo(string imoNumber)
    {
        try
        {
            var imo = new ImoNumber(imoNumber);
            var vessel = _vesselRepo.GetByImoNumber(imo);

            if (vessel == null)
            {
                return NotFound();
            }

            var vesselDto = new VesselDto
            {
                Id = vessel.Id,
                ImoNumber = vessel.ImoNumber.Value,
                Name = vessel.Name,
                VesselType = vessel.VesselType,
                Operator = vessel.Operator
            };

            return Ok(vesselDto);
        }
        catch (ArgumentException ex) when (ex.ParamName == "imoNumber")
        {
            // Captura o erro de validação do Value Object ImoNumber
            return BadRequest(new { Message = ex.Message });
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    // POST: api/Vessels (User Story 2.2.2 - Register Vessel)
    [HttpPost]
    public ActionResult<VesselDto> Create(CreateVesselDto dto)
    {
        try
        {
            // 1. Cria o Value Object (Validação do IMO Number ocorre aqui!)
            var imo = new ImoNumber(dto.ImoNumber);

            // 2. Cria a Entidade de Domínio
            var vessel = new Vessel(imo, dto.Name, dto.VesselType, dto.Operator);

            // 3. Persiste a Entidade (usando o Repositório)
            var newVessel = _vesselRepo.Add(vessel);

            if (newVessel == null)
            {
                return Conflict(new { Message = "Vessel with this IMO Number already exists." });
            }

            var vesselDto = new VesselDto
            {
                Id = newVessel.Id,
                ImoNumber = newVessel.ImoNumber.Value,
                Name = newVessel.Name,
                VesselType = newVessel.VesselType,
                Operator = newVessel.Operator
            };

            // Retorna 201 Created (Sucesso)
            return CreatedAtAction(nameof(GetByImo), new { imoNumber = vesselDto.ImoNumber }, vesselDto);
        }
        catch (ArgumentException ex) when (ex.ParamName == "imoNumber")
        {
            // Captura o erro de validação do Value Object ImoNumber
            return BadRequest(new { Message = ex.Message });
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    // PUT: api/Vessels/9074729 (User Story 2.2.2 - Update Vessel)
    [HttpPut("{imoNumber}")]
    public ActionResult<VesselDto> Update(string imoNumber, [FromBody] UpdateVesselDto dto)

    {
        try
        {
            // 1. Encontra o navio existente
            var imo = new ImoNumber(imoNumber);
            var vessel = _vesselRepo.GetByImoNumber(imo);

            if (vessel == null)
            {
                return NotFound();
            }

            // 2. Atualiza a Entidade de Domínio (Regra de Negócio)
            vessel.Update(dto.Name, dto.VesselType, dto.Operator);

            // 3. Persiste a atualização
            _vesselRepo.Update(vessel);

            var vesselDto = new VesselDto
            {
                Id = vessel.Id,
                ImoNumber = vessel.ImoNumber.Value,
                Name = vessel.Name,
                VesselType = vessel.VesselType,
                Operator = vessel.Operator
            };

            // Retorna 200 OK (Sucesso)
            return Ok(vesselDto);
        }
        catch (ArgumentException ex) when (ex.ParamName == "imoNumber")
        {
            // Captura o erro de validação do Value Object ImoNumber
            return BadRequest(new { Message = ex.Message });
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }
}
