using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Staff;

namespace DDDSample1.Controllers {
  [Route("api/[controller]")]
  [ApiController]
  public class StaffMembersController : ControllerBase {
    private readonly StaffMemberService _service;
    public StaffMembersController(StaffMemberService service) { _service = service; }

    // POST /api/staffmembers
    [HttpPost]
    public async Task<ActionResult<StaffMemberViewDto>> Create([FromBody] CreateStaffMemberDto dto) {
      var created = await _service.CreateAsync(dto);
      return Created($"/api/staffmembers/{created.Code}", created);
    }

    // PATCH /api/staffmembers/{code}
    [HttpPatch("{code}")]
    public async Task<ActionResult<StaffMemberViewDto>> Update(string code, [FromBody] UpdateStaffMemberDto dto) {
      var updated = await _service.UpdateAsync(code, dto);
      return Ok(updated);
    }

    // GET /api/staffmembers?code=...&name=...
    [HttpGet]
    public async Task<ActionResult> Search([FromQuery] string code, [FromQuery] string name) {
      var list = await _service.SearchAsync(code, name);
      return Ok(list);
    }
  }
}
