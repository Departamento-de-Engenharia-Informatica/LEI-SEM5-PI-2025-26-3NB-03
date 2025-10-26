using DDDSample1.Domain.Shared;
using DDDSample1.Domain.StorageAreas;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StorageAreasController : ControllerBase
    {
        private readonly StorageAreaService _service;

        public StorageAreasController(StorageAreaService service)
        {
            _service = service;
        }

        // GET: api/StorageAreas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StorageAreaDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/StorageAreas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StorageAreaDto>> GetById(Guid id)
        {
            var storageArea = await _service.GetByIdAsync(new StorageAreaId(id));

            if (storageArea == null)
            {
                return NotFound();
            }
            return storageArea;
        }

        // POST: api/StorageAreas
        [HttpPost]
        public async Task<ActionResult<StorageAreaDto>> Create(CreatingStorageAreaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var storageArea = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = storageArea.Id }, storageArea);
        }

        // PUT: api/StorageAreas/5
        [HttpPut("{id}")]
        public async Task<ActionResult<StorageAreaDto>> Update(Guid id, StorageAreaDto dto)
        {
            if (id != dto.Id || !ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var storageArea = await _service.UpdateAsync(dto);
                
                if (storageArea == null)
                {
                    return NotFound();
                }
                return Ok(storageArea);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}