using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.VesselVisitNotifications;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VvnsController : ControllerBase
    {
        private readonly VvnService _service;
        public VvnsController(VvnService service) { _service = service; }

        [HttpGet]
        public async Task<ActionResult> Search(
            [FromQuery] string vessel,
            [FromQuery] string status,
            [FromQuery] string representative,
            [FromQuery] DateTime? from,
            [FromQuery] DateTime? to,
            [FromQuery] int page = 1,
            [FromQuery] int size = 20,
            [FromQuery] string sort = "-submittedAt")
        {
            // RBAC & org-scope (simplificado por headers, alinhado com SD)
            var roles = Request?.Headers["X-Roles"].ToString() ?? string.Empty;
            var orgId = Request?.Headers["X-Org-Id"].ToString();

            if (string.IsNullOrWhiteSpace(orgId) || !roles.Contains("SHIPPING_AGENT_REP"))
                return Forbid();

            if (page < 1 || size < 1 || size > 200)
                return BadRequest(new { message = "Invalid pagination." });
            if (from.HasValue && to.HasValue && from > to)
                return BadRequest(new { message = "'from' must be <= 'to'." });

            try
            {
                var (items, total) = await _service.SearchAsync(orgId, vessel, status, representative, from, to, page, size, sort);
                Response.Headers["X-Total-Count"] = total.ToString();
                return Ok(items);
            }
            catch (ArgumentException ex) when (ex.Message == "Invalid status")
            {
                return BadRequest(new { message = "Invalid status." });
            }
        }
    }
}
