using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Docks;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocksController : ControllerBase
    {
        private readonly DockService _service;

        public DocksController(DockService service)
        {
            _service = service;
        }

        // POST: api/docks
        [HttpPost]
        public async Task<ActionResult<DockDto>> CreateDock([FromBody] CreatingDockDto dto)
        {
            try
            {
                var dock = await _service.AddAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = dock.Id }, dock);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // GET: api/docks/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<DockDto>> GetById(Guid id)
        {
            var dock = await _service.GetByIdAsync(id);
            if (dock == null)
                return NotFound();

            return Ok(dock);
        }

        // GET: api/docks/by-name/{name}
        [HttpGet("by-name/{name}")]
        public async Task<ActionResult<List<DockDto>>> GetByName(string name)
        {
            var docks = await _service.GetByNameAsync(name);
            return Ok(docks);
        }

        // GET: api/docks/by-location/{location}
        [HttpGet("by-location/{location}")]
        public async Task<ActionResult<List<DockDto>>> GetByLocation(string location)
        {
            var docks = await _service.GetByLocationAsync(location);
            return Ok(docks);
        }

        // GET: api/docks/by-vessel-type/{vesselTypeId}
        [HttpGet("by-vessel-type/{vesselTypeId:guid}")]
        public async Task<ActionResult<List<DockDto>>> GetByVesselType(Guid vesselTypeId)
        {
            var docks = await _service.GetByVesselTypeAsync(vesselTypeId);
            return Ok(docks);
        }
    }
}
