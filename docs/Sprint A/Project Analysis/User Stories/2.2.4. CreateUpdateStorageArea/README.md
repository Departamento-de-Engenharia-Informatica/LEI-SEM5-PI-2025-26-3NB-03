## User Story 2.2.4. Create/Update Storage Area

### 2.2.4. As a Port Authority Officer, I want to register and update storage areas, so that (un)loading and storage operations can be assigned to the correct locations.
**Acceptance Criteria / Comments:**
 - Each storage area must have a unique identifier, type (e.g., yard, warehouse), and location within the port.
 - Storage areas must specify maximum capacity (in TEUs) and current occupancy.
 - By default, a storage area serves the entire port (i.e., all docks). However, some storage areas (namely yards) may be constrained to serve only a few docks, usually the closest ones.
 - Complementary information, such as the distance between docks and storage areas, must be manually recorded to support future logistics planning and optimization.
 - Updates to storage areas must not allow the current occupancy to exceed maximum capacity.

### SD Level 1

![SD_L1](../SD_L1_Generic_Post_Put.png)

![SD_L1](../SD_L1_Generic_Get.png)

User: Port Authority Officer<br>
x: Storage Area

### SD Other Levels

N/A