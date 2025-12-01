using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Qualifications;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QualificationsController : ControllerBase
    {
        private readonly QualificationService _service;

        public QualificationsController(QualificationService service)
        {
            _service = service;
        }


        [HttpPost]
        public async Task<ActionResult<QualificationViewDto>> Create([FromBody] CreateQualificationDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return Created($"/api/qualifications/{created.Code}", created);
        }


        [HttpPatch("{code}")]
        public async Task<ActionResult<QualificationViewDto>> Update(string code, [FromBody] UpdateQualificationDto dto)
        {
            var updated = await _service.UpdateAsync(code, dto);
            return Ok(updated);
        }


        [HttpGet]
        public async Task<ActionResult> Search([FromQuery] string code, [FromQuery] string name)
        {
            var list = await _service.SearchAsync(code, name);
            return Ok(list);
        }
    }
}
