using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.VesselTypes;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VesselTypeController : ControllerBase
    {
        private readonly VesselTypeService _service;

        public VesselTypeController(VesselTypeService service)
        {
            _service = service;
        }

        // POST: api/vesseltype
        [HttpPost]
        public async Task<ActionResult<VesselTypeDto>> CreateVesselType([FromBody] CreatingVesselTypeDto dto)
        {
            try
            {
                var vesselType = await _service.AddAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = vesselType.Id }, vesselType);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // GET: api/vesseltype
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VesselTypeDto>>> GetAll()
        {
            var vesselTypes = await _service.GetAllAsync();
            return Ok(vesselTypes);
        }

        // GET: api/vesseltype/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<VesselTypeDto>> GetById(Guid id)
        {
            var vesselType = await _service.GetByIdAsync(id);
            if (vesselType == null)
                return NotFound();

            return Ok(vesselType);
        }

        // GET: api/vesseltype/by-name/{name}
        [HttpGet("by-name/{name}")]
        public async Task<ActionResult<IEnumerable<VesselTypeDto>>> GetByName(string name)
        {
            var vesselTypes = await _service.GetByNameAsync(name);
            return Ok(vesselTypes);
        }

        // GET: api/vesseltype/by-description/{description}
        [HttpGet("by-description/{description}")]
        public async Task<ActionResult<IEnumerable<VesselTypeDto>>> GetByDescription(string description)
        {
            var vesselTypes = await _service.GetByDescriptionAsync(description);
            return Ok(vesselTypes);
        }

        // PUT: api/vesseltype/
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<VesselTypeDto>> UpdateVesselType(Guid id, [FromBody] VesselTypeDto dto)
        {
            if (id != dto.Id)
                return BadRequest("ID do URL não corresponde ao ID do corpo.");

            var updated = await _service.UpdateAsync(dto);
            if (updated == null)
                return NotFound();

            return Ok(updated);
        }
    }
}
