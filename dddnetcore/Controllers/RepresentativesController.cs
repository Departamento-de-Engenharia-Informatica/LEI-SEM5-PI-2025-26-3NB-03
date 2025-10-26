using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Representatives;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepresentativesController : ControllerBase
    {
        private readonly RepresentativeService _service;

        public RepresentativesController(RepresentativeService service)
        {
            _service = service;
        }

        // GET: api/Representatives
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RepresentativeDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Representatives/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RepresentativeDto>> GetGetById(Guid id)
        {
            var representative = await _service.GetByIdAsync(new RepresentativeId(id));

            if (representative == null)
            {
                return NotFound();
            }

            return representative;
        }

        // POST: api/Representatives
        [HttpPost]
        public async Task<ActionResult<RepresentativeDto>> Create(CreatingRepresentativeDto dto)
        {
            var representative = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = representative.Id }, representative);
        }

        // PUT: api/Representatives/5
        [HttpPut("{id}")]
        public async Task<ActionResult<RepresentativeDto>> Update(Guid id, RepresentativeDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var representative = await _service.UpdateAsync(dto);
                
                if (representative == null)
                {
                    return NotFound();
                }
                return Ok(representative);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Representatives/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RepresentativeDto>> SoftDelete(Guid id)
        {
            var representative = await _service.InactivateAsync(new RepresentativeId(id));

            if (representative == null)
            {
                return NotFound();
            }

            return Ok(representative);
        }
    }
}