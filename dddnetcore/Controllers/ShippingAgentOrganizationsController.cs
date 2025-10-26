using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.ShippingAgentOrganizations;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingAgentOrganizationsController : ControllerBase
    {
        private readonly ShippingAgentOrganizationService _service;

        public ShippingAgentOrganizationsController(ShippingAgentOrganizationService service)
        {
            _service = service;
        }

        // GET: api/ShippingAgentOrganizations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShippingAgentOrganizationDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/ShippingAgentOrganizations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShippingAgentOrganizationDto>> GetGetById(Guid id)
        {
            var organization = await _service.GetByIdAsync(new ShippingAgentOrganizationId(id));

            if (organization == null)
            {
                return NotFound();
            }

            return organization;
        }

        // POST: api/ShippingAgentOrganizations
        [HttpPost]
        public async Task<ActionResult<ShippingAgentOrganizationDto>> Create(CreatingShippingAgentOrganizationDto dto)
        {
            var organization = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = organization.Id }, organization);
        }

        // PUT: api/ShippingAgentOrganizations/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ShippingAgentOrganizationDto>> Update(Guid id, ShippingAgentOrganizationDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var organization = await _service.UpdateAsync(dto);
                
                if (organization == null)
                {
                    return NotFound();
                }
                return Ok(organization);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}