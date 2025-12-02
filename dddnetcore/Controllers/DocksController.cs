using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Docks;
using DDDSample1.Domain.Shared;


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

        // GET: api/docks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DockDto>>> GetAll()
        {
            var docks = await _service.GetAllAsync();
            return Ok(docks);
        }


        // POST: api/docks
        [HttpPost]
        public async Task<ActionResult<DockDto>> Create(CreatingDockDto dto)
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
        /*[HttpGet("by-location/{location}")]
        public async Task<ActionResult<List<DockDto>>> GetByLocation(float locationx)
        {
            var docks = await _service.GetByLocationAsync(locationx);
            return Ok(docks);
        }*/

        // GET: api/docks/by-vessel-type/{vesselTypeId}
        [HttpGet("by-vessel-type/{vesselTypeId:guid}")]
        public async Task<ActionResult<List<DockDto>>> GetByVesselType(Guid vesselTypeId)
        {
            var docks = await _service.GetByVesselTypeAsync(vesselTypeId);
            return Ok(docks);
        }

         // PUT: api/StorageAreas/id
        [HttpPut("{id}")]
        public async Task<ActionResult<DockDto>> Update(Guid id, UpdateDockDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var dock = await _service.UpdateAsync(id, dto);

                if (dock == null)
                    return NotFound();

                return Ok(dock);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
