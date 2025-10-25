using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.VesselTypes;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VesselTypesController : ControllerBase
    {
        private readonly VesselTypeService _service;

        public VesselTypesController(VesselTypeService service)
        {
            _service = service;
        }

        // GET: api/VesselTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VesselTypeDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/VesselTypes/5
        [HttpGet("{name}")]
        public async Task<ActionResult<VesselTypeDto>> GetByName(string name)
        {
            var vt = await _service.GetByNameAsync(name);

            if (vt == null)
            {
                return NotFound();
            }

            return vt;
        }

        // GET: api/VesselTypes/5
        [HttpGet("{description}")]
        public async Task<ActionResult<VesselTypeDto>> GetByDescription(string name)
        {
            var vt = await _service.GetByDescriptionAsync(name);

            if (vt == null)
            {
                return NotFound();
            }

            return vt;
        }

        // POST: api/VesselTypes
        [HttpPost]
        public async Task<ActionResult<VesselTypeDto>> Create(CreatingVesselTypeDto dto)
        {
            var vt = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetByName), new { id = vt.Id }, vt);
        }

        
        
        
    }
}