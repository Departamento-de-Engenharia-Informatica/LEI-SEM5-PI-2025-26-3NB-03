using DDDSample1.Domain.PhysicalResources;
using DDDSample1.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhysicalResourcesController : ControllerBase
    {
        private readonly PhysicalResourceService _service;

        public PhysicalResourcesController(PhysicalResourceService service)
        {
            _service = service;
        }

        // GET: api/PhysicalResources
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhysicalResourceDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/PhysicalResources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PhysicalResourceDto>> GetById(Guid id)
        {
            var resource = await _service.GetByIdAsync(new PhysicalResourceId(id));

            if (resource == null)
            {
                return NotFound();
            }

            return resource;
        }

        // POST: api/PhysicalResources
        [HttpPost]
        public async Task<ActionResult<PhysicalResourceDto>> Create(CreatingPhysicalResourceDto dto)
        {
            var resource = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = resource.Id }, resource);
        }

        // PUT: api/PhysicalResources/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PhysicalResourceDto>> Update(Guid id, PhysicalResourceDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var resource = await _service.UpdateAsync(dto);
                
                if (resource == null)
                {
                    return NotFound();
                }
                return Ok(resource);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/PhysicalResources/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PhysicalResourceDto>> SoftDelete(Guid id)
        {
            var resource = await _service.InactivateAsync(new PhysicalResourceId(id));

            if (resource == null)
            {
                return NotFound();
            }

            return Ok(resource);
        }
    }
}