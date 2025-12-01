# [INTEGRATIVE PROJECT OF THE 5TH SEMESTER OF LEI-ISEP](README.md)
## 2025-2026 (version III.c)

# PART III – User Stories

## 1 Preamble
In the academic year 2025-2026, the fifth semester (i.e., the 3rd year, 1st semester) of the Bachelor's Degree in Informatics Engineering (LEI) at the Instituto Superior de Engenharia do Porto (ISEP) adopts a teaching-learning process based on the development of a single project enhancing the integration and application of knowledge, skills and competencies of all course units (UCs) taught through the semester: Administração de Sistemas (ASIST), Arquitetura de Sistemas (ARQSI), Gestão (GESTA), Inteligência Artificial (IART), Laboratório e Projeto V (LAPR5) e Sistemas Gráficos e Interação (SGRAI).<br><br>
The project, common to all course units, consists of developing the system described earlier in the document with the same title as this one and whose subtitle is "[PART II – System Specification](SystemSpecification.md)". Therefore, the **User Stories presented in this document should be interpreted considering such description.**

## 2. [Sprint A](Sprint%20A/)
The aim of this sprint is three-fold: (i) to set up the tools and infrastructure necessary to properly develop and manage the project, following engineering best practices; (ii) to develop back-end module(s) exposing REST API(s) for managing port facilities, shipping agents, and logistic resources; and (iii) to study and analyze the project client from an organizational and managerial point of view.

### 2.1. Project Setup & Engineering Practices

#### 2.1.1. As a Project Manager, I want the team to set up the tools and infrastructure necessary to properly develop and manage the project (e.g., source code repository, issue tracking, task status/progress monitoring), employing engineering best practices.

**Acceptance Criteria / Comments:**

- GitHub must be used as the version control system (VCS).
- The VCS repository must be created inside the DEI Organization branch on GitHub.
- Repository name must follow the pattern: LEI-SEM5-PI-2025-26-XXX-YY, where XXX is the team class (e.g., 3DC) and YY is the team number (e.g., 04).
- Repository structure must be suitable to accommodate multiple applications and technologies as well as the project documentation.
- Task / Issue tracking and project boards must be adopted.

### 2.2. Back-end Module(s)

#### [2.2.1.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.1.%20CreateUpdateVesselType/) As a Port Authority Officer, I want to create and update vessel types, so that vessels can be classified consistently and their operational constraints are properly defined.

**Acceptance Criteria / Comments:**

- Vessel types must include attributes such as name, description, capacity, and operational constraints (e.g.: maximum number of rows, bays, and tiers).
- Vessel types must be available for reference when registering vessel records.
- Vessel types must be searchable and filterable by name and description.

#### [2.2.2.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.2.%20CreateUpdateVessel/) As a Port Authority Officer, I want to register and update vessel records, so that valid vessels can be referenced in visit notifications.

**Acceptance Criteria / Comments:**

- Each vessel record must include key attributes such as IMO number, vessel name, vessel type and operator/owner.
- The system must validate that the IMO number follows the official format (seven digits with a check digit), otherwise reject it.
- Vessel records must be searchable by IMO number, name, or operator.

#### [2.2.3.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.3.%20CreateUpdateDock/) As a Port Authority Officer, I want to register and update docks, so that the system accurately reflects the docking capacity of the port.
**Acceptance Criteria / Comments:**

- A dock record must include a unique identifier, name/number, location within the port, and physical characteristics (e.g., length, depth, max draft).
- The officer must specify the vessel types allowed to berth there.
- Docks must be searchable and filterable by name, vessel type, and location.

#### [2.2.4.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.4.%20CreateUpdateStorageArea/) As a Port Authority Officer, I want to register and update storage areas, so that (un)loading and storage operations can be assigned to the correct locations.

**Acceptance Criteria / Comments:**

- Each storage area must have a unique identifier, type (e.g., yard, warehouse), and location within the port.
- Storage areas must specify maximum capacity (in TEUs) and current occupancy.
- By default, a storage area serves the entire port (i.e., all docks). However, some storage areas (namely yards) may be constrained to serve only a few docks, usually the closest ones.
- Complementary information, such as the distance between docks and storage areas, must be manually recorded to support future logistics planning and optimization.
- Updates to storage areas must not allow the current occupancy to exceed maximum capacity.

#### [2.2.5.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.5.%20CreateShippingAgentOrganization/) As a Port Authority Officer, I want to register new shipping agent organizations, so that they can operate within the port’s digital system.

**Acceptance Criteria / Comments:**

- Each organization must have at least an identifier, legal and alternative names, an address, its tax number.
- Each organization must include at least one representative at the time of registration.
- Representatives must be registered with name, citizen ID, nationality, email, and phone number. Email and phone number are used for system notifications, including approval decisions and the authentication process.

#### [2.2.6.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.6.%20CreateUpdateRepresentative/) As a Port Authority Officer, I want to register and manage representatives of a shipping agent organization (create, update, deactivate), so that the right individuals are authorized to interact with the system on behalf of their organization.

**Acceptance Criteria / Comments:**

- Each representative must be associated with exactly one shipping agent organization.
- Required representative details include name, citizen ID, nationality, email, and phone number.

#### [2.2.7.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.7.%20ReviewVesselVisitNotification/) As a Port Authority Officer, I want to review pending Vessel Visit Notifications and approve or reject them, so that docking schedules remain under port control.

**Acceptance Criteria / Comments:**

- When a notification is approved, the officer must assign a (temporarily) dock on which the vessel should berth.
- When a notification is rejected, the officer must provide a reason for rejection (e.g., information is missing).
- If rejected, the shipping agent representative might review / update the notification for further new decision.
- All decisions (approve/reject) must be logged with timestamp, officer ID, and decision outcome for auditing purposes.

#### [2.2.8.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.8.%20CreateVesselVisitNotification/) As a Shipping Agent Representative, I want to create/submit a Vessel Visit Notification, so that the vessel berthing and subsequent (un)loading operations at the port are scheduled and planned in space and timely manner.

**Acceptance Criteria / Comments:**

- The Cargo Manifest data for unloading and/or loading is included.
- The system must validate that referred containers identifiers comply with the ISO 6346:2022 standard.
- Information about the crew (name, citizen id, nationality) might be requested, when necessary, for compliance with security protocols.
- Vessel Visit Notifications might become at an "in progress" status (e.g. cargo information is incomplete) to be further update/completed.
- When completed / ready for asking approval, the agent is required to change its state to "submitted".

#### [2.2.9.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.9.%20UpdateVesselVisitNotification/) As a Shipping Agent Representative, I want to change / complete a Vessel Visit Notification while it is still in progress, so that I can correct errors or withdraw requests if necessary.

**Acceptance Criteria / Comments:**

- Status can be maintained "in progress" or changed to "submitted / approval pending" by the representative.

#### [2.2.10.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.10.%20ViewVesselVisitNotificationsStatus/) As a Shipping Agent Representative, I want to view the status of all my submitted Vessel Visit Notifications (in progress, pending, approved with current dock assignment, or rejected with reason), so that I am always informed about the decisions of the Port Authority.

**Acceptance Criteria / Comments:**

- The Shipping Agent Representative may also view the status of Vessel Visit Notifications submitted by other representatives working for the same shipping agent organization.
- Vessel Visit Notifications must be searchable and filterable by vessel, status, representative and time.

#### [2.2.11.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.11.%20CreateUpdateStaffMember/) As a Logistics Operator, I want to register and manage operating staff members (create, update, deactivate), so that the system can accurately reflect staff availability and ensure that only qualified personnel are assigned to resources during scheduling.

**Acceptance Criteria / Comments:**

- Each staff member must have a unique mecanographic number (ID), short name, contact details (email, phone), qualifications, operational window, and current status (e.g., available, unavailable).
- Deactivation/reactivation must not delete staff data but preserve it for audit and historical planning purposes.
- Staff members must be searchable and filterable by id, name, status, and qualifications.

#### [2.2.12.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.12.%20CreateUpdatePhysicalResource/) As a Logistics Operator, I want to register and manage physical resources (create, update, deactivate), so that they can be accurately considered during planning and scheduling operations.

**Acceptance Criteria / Comments:**

- Resources include cranes (fixed and mobile), trucks, and other equipment directly involved in vessel and yard operations.
- Each resource must have a unique alpha-numeric code and a description.
- Each resource must store its operational capacity, which varies according to the kind of resource, and, if any, the assigned area (e.g., Dock A, Yard B).
- Additional properties must include:
    - Current availability status (active, inactive, under maintenance).
    - Setup time (in minutes), if relevant, before starting operations.
    - (Staff) Qualification requirements, ensuring only properly certified staff can be scheduled with the resource.
- Deactivation/reactivation must not delete resource data but preserve it for audit and historical planning purposes.
- Resources must be searchable and filterable by code, description, kind of resource, status.

#### [2.2.13.](Sprint%20A/Project%20Analysis/User%20Stories/2.2.13.%20CreateUpdateQualification/) As a Logistics Operator, I want to register and manage qualifications (create, update), so that staff members and resources can be consistently associated with the correct skills and certifications required for port operations.

**Acceptance Criteria / Comments:**

- Each qualification has a unique code and a descriptive name (e.g., "STS Crane Operator", "Truck Driver").
- Qualifications must be searchable and filterable by code or name.
- A qualification must exist before it can be assigned to staff members or resources.

### 2.3. Project Client Analysis

#### 2.3.1. As a Project Manager, I want the team to prepare a summary presentation of the client organization, so that anyone can easily understand what it is and what it does.

**Acceptance Criteria / Comments:**

- Select a real European company in the field of port management.
- The summary must include type of organization, ownership structure, activities and scope of operations, main products and markets, countries of presence.
- Include key indicators (e.g., number of employees, sales volume, or another relevant business activity indicator).
- The presentation must be clear, concise, and professional.

#### 2.3.2. As a Project Manager, I want the team to analyze the organizational structure of the client, so that we can understand how the company operates and adapts to change.

**Acceptance Criteria / Comments:**

- Use the organizational chart and related documentation.
- Analyze departmentalization, number of hierarchical levels, line and staff positions.
- Identify formal and informal structures, as well as flexibility/rigidity in decision-making.
- Highlight ability to adapt to change.

#### 2.3.3. As a Project Manager, I want the team to suggest improvements to the organization’s internal structure or rules, so that we can identify ways to enhance its performance.

**Acceptance Criteria / Comments:**

- Suggestions must be justified (e.g., modify departmentalization, grant more or less autonomy).
- Focus on actionable and realistic changes.

#### 2.3.4. As a Project Manager, I want the team to identify and comment on the organization’s values, vision, and mission, so that we can understand its cultural and strategic orientation.

**Acceptance Criteria / Comments:**

- Identify each element (values, vision, mission) from the available documentation.
- Provide a management-oriented commentary on their coherence and effectiveness.

#### 2.3.5. As a Project Manager, I want the team to propose one SMART objective for each of the three management levels, so that we can assess the organization’s alignment across strategic, tactical, and operational levels.

**Acceptance Criteria / Comments:**

- Justify why each objective is suitable for its level.

#### 2.3.6. As a Project Manager, I want the team to conduct a SWOT analysis of the organization, so that we can evaluate its internal strengths/weaknesses and external opportunities/threats.

**Acceptance Criteria / Comments:**

- SWOT must be based on PESTEL, Porter, value chain, and VRIO methodologies.
- Sources of information must be clearly indicated.
- Present SWOT in table form.
- Highlight the most relevant aspects of the internal and external situation.

#### 2.3.7. As a Project Manager, I want the team to propose a possible strategy for the organization, so that we can identify a future direction aligned with its situation.

**Acceptance Criteria / Comments:**

- The strategy must be derived from the SWOT analysis.
- It should be realistic, actionable, and justified.

### 2.4. Additional Remarks

Considering the initial phase of the project and the existence of teams of varying sizes (due to distinct number of members), it is necessary to take measures to reduce the risk associated with successful project development. To this end, Table 1 presents the [mandatory scope of work for each team member](Sprint%20A/Sprint%20Planning/README.md#mandatory-scope-of-work-for-every-team-member) (marked with an “X”).

<p align="center">TABLE 1. MANDATORY SCOPE OF WORK FOR EVERY TEAM MEMBER.</p>

<table>
    <thead>
        <tr>
            <th rowspan="2">Scope of Work<br>(by Main Concept)</th>
            <th colspan="5">Team Composition</th>
        </tr>
        <tr>
            <th>Member 1</th>
            <th>Member 2</th>
            <th>Member 3</th>
            <th>Member 4</th>
            <th>Member 5</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Dock                         </td><td> </td><td>X</td><td> </td><td> </td><td> </td></tr>
        <tr><td>Qualification                </td><td> </td><td> </td><td>X</td><td>X</td><td> </td></tr>
        <tr><td>Resource                     </td><td> </td><td> </td><td>X</td><td> </td><td> </td></tr>
        <tr><td>Shipping Agent Organization  </td><td> </td><td> </td><td> </td><td> </td><td>X</td></tr>
        <tr><td>Shipping Agent Representative</td><td> </td><td> </td><td> </td><td> </td><td>X</td></tr>
        <tr><td>Staff Member                 </td><td> </td><td> </td><td> </td><td>X</td><td> </td></tr>
        <tr><td>Storage Area                 </td><td>X</td><td>X</td><td>X</td><td>X</td><td> </td></tr>
        <tr><td>Vessel                       </td><td>X</td><td> </td><td> </td><td> </td><td> </td></tr>
        <tr><td>Vessel Type                  </td><td>X</td><td>X</td><td> </td><td> </td><td> </td></tr>
        <tr><td>Vessel Visit Notification    </td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td></tr>
    </tbody>
</table>

According to this table, for example, the first team member is solely responsible for the functionalities involving the Vessel concept and shares (equally) responsibilities with the second team member regarding the functionalities involving the Vessel Type concept. Furthermore, (s)he assumes shared responsibilities with the other team members regarding Storage Area and Vessel Visit Notification. A similar analysis should be performed for the remaining team members. When the team lacks a member (e.g., the fifth and, in some cases, also the fourth), the solely responsibilities of the absent members may not be fulfilled by the team. However, the team must ensure that the remaining responsibilities, that is, the responsibilities shared with the absent members, are fulfilled.<br><br>
By complying with these general rules, the team is ensuring a smooth running of the project for sprint B and C.

## 3. [Sprint B](Sprint%20B/)

Sprint B focuses on extending the prototype into a modular, integrated, and operationally viable system. Accordingly, work is structured around seven key areas: (i) developing a unified Front-end Application (SPA); (ii) enforcing secure Authentication and Authorization across both front-end and back-end components; (iii) introducing a 3D Visualization module synchronized with live system data; (iv) initiating the Scheduling and Planning engine to support operational decision-making; (v) exploiting some Systems Administration best practices and establishing some Business Continuity (BC) foundations; (vi) reinforcing GDPR awareness and data protection responsibility; and (vii) extending the Project Client Analysis with deeper insights into managerial, operational, and sustainability practices. Together, these efforts aim to deliver not only functional capabilities, but also security, resilience, compliance, and contextual understanding of the target business environment.

### 3.1. Front-end Application

The front-end must be developed as a Single Page Application (SPA), providing a unified interface for all user roles. It must dynamically adapt navigation and available features based on each user’s internal authorization, while consuming the REST APIs provided by the back-end module(s) in accordance with the (general) system architecture.

#### 3.1.1. As a Project Manager, I want the team to set up the SPA using a modern framework, so that future features can be developed in a maintainable way.

**Acceptance Criteria / Comments:**

- SPA must be built using a framework such as Angular, React or Vue.
- A modular folder structure (e.g., components, services, pages, routing) is required.
- The SPA must adopt a well-founded HTTP client (e.g., Axios/Fetch) for REST API consumption.

#### 3.1.2. As a System User, I want the SPA to provide a unified layout, so that navigation is consistent across the application.

**Acceptance Criteria / Comments:**

- The application layout must include at minimum:
    - A header bar containing the system/company logo and name.
    - A designated area for primary navigation (e.g., top menu, side menu, or equivalent).
    - These two elements must always be visible, in any circumstance.
- The layout may optionally include:
    - Secondary navigation elements, such as submenus or breadcrumbs
    - A sidebar, footer, or other auxiliary interface sections to enhance usability.
- Menu options must be rendered dynamically based on the logged-authenticated user's role.
- UI styling must follow a consistent design system/component library.
- It must have multilingual support (e.g.: English and Portuguese).
- The layout must adapt to different screen sizes (desktop orientation first; tablet/mobile support may be planned).

#### 3.1.3. As a System User with a specific role, I want the SPA to show only the menus relevant to my permissions, so that the interface remains clear and I can only access allowed features.

**Acceptance Criteria / Comments:**

- Menu options must be rendered dynamically based on the logged-authenticated user's role.
- Navigation to unauthorized sections must be prevented (even if manually typed in the URL).

#### 3.1.4. As a System User, I want to receive clear feedback when actions succeed or fail in the SPA, so that I understand what happened and can react accordingly.

**Acceptance Criteria / Comments:**

- Success messages must be shown after completing actions like save, update, or deactivate.
- Validation errors must be shown near the affected input fields.
- Loading indicators must be used during asynchronous operations.
- Errors (e.g. due API calls) must be captured and displayed in a user-friendly format.

#### 3.1.5. As a System User, I want the SPA to provide suitable pages/forms to perform the actions I am authorized to, so that I can interact with the system through a graphical interface.

**Acceptance Criteria / Comments:**

- Forms must validate required fields before submission.
- Navigation to these pages must follow the role-based menu rules.
- Data must be fetched from and persisted to the corresponding REST API.
- List views must support filtering and searching as defined in Sprint A.
- Priority should be given to the following (from highest to lowest) functions:
    - US 2.2.7/8/9/10, related to Vessel Visit Notifications
    - US 2.2.4, related with Storage Areas
    - US 2.2.12, related with Physical Resources
    - US 2.2.3, related with Docks
    - US 2.2.2, related with Vessels
    - US 2.2.5, related with Shipping Agent Organizations and Representatives

### 3.2. Authentication & Authorization

#### 3.2.1. As a (Non-Authenticated) System User, I want to authenticate using the external IAM provider, so that I can securely access the system without managing separate credentials.

**Acceptance Criteria / Comments:**

- The SPA must integrate with the selected IAM (e.g., via OAuth2/OpenID Connect).
- Unauthenticated users must be redirected to the IAM login page.
- The system must not handle the password storage.
- After successful authentication, a valid access token must be available to the front-end.
- Logout must also be supported, clearing tokens/session data.

#### 3.2.2. As a System User, I want the system to automatically load my internal authorization role after authentication, so that I gain access only to my permitted features.

**Acceptance Criteria / Comments:**

- After IAM login, the SPA must call a backend endpoint to retrieve the user’s assigned role and render the respective menu options.
- If the user has no assigned role or it is inactive, access must be denied with an appropriate message.

#### 3.2.3. As a System User, I want my authenticated session to be maintained securely, so that I don’t need to re-login frequently while using the SPA.

**Acceptance Criteria / Comments:**

- Access tokens must be securely stored.
- Token expiration must be handled (e.g., silent refresh or forced re-login when invalid).
- The SPA must try to avoid unauthorized API calls by, for instance, attaching the user access token to requests.
- Back-end module(s) must also validate tokens on each request.

#### 3.2.4. As a System User, I want the system to restrict access to actions and features based on my role, so that I cannot perform unauthorized operations.

**Acceptance Criteria / Comments:**

- On the back-end side:
    - Each REST API route must enforce role-based access control (RBAC) and/or attributebased access control (ABAC) as needed to enforce the applicable business rules.
    - Unauthorized requests must return proper HTTP status codes (e.g., 403 Forbidden).
    - Logs must record unauthorized attempts.
- On the front-end side:
    - Front-end routes must check for the user’s authorization before rendering pages.
    - Direct URL access to unauthorized pages must be prevented.
    - A default “Access Denied” or “Not Authorized” page must be shown when needed.

#### 3.2.5. As an Administrator, I want to assign (or update) the internal role(s) of a given user, so that they can access only the features appropriate to their responsibilities.

**Acceptance Criteria / Comments:**

- Users are identified by IAM-provided attributes (userId, email, name).
- When authorizing a user for the first time:
    - A unique activation link is sent to their email.
    - By default, the users are set to a "deactivated" status.
- Internal roles determine system access level.

#### 3.2.6. As a System User receiving an activation link, I want to complete my first access securely through authentication, so that I can start using the system.

**Acceptance Criteria / Comments:**

- The activation link redirects the user to authenticate via IAM.
- Once authenticated, the system must confirm that the authenticated user data matches the user identity related to the link being used:
    - In case of success, the system completes the activation process (status update).
    - Otherwise, an error must be presented, preventing system access.
- Expired or invalid links must show an error message.
- After activation, the user gains role-based access.

### 3.3. 3D Visualization

#### 3.3.1. As a Project Manager, I want the team to develop and integrate a 3D visualization module into the SPA, so that users can begin interacting with a visual representation of the port environment.

**Acceptance Criteria / Comments:**

- The 3D engine (e.g., Three.js, WebGL) must be embedded, as a component, in the SPA.
- The 3D module must load as part of the existing SPA routing and layout (cf. US 3.1.2).
- The integration must not break the existing UI or authentication flow.
- The source code of the 3D module must be integrated into the existing repository structure.

#### 3.3.2. As a System User, I want to see a 3D representation of the port structure (docks, container yards and warehouses) based on real data, so that I can visualize the physical layout accurately.

**Acceptance Criteria / Comments:**

- The 3D module must retrieve the port layout from the backend as JSON-formatted content. Tip: the layout may use placeholders for positioning the port facilities as well as to map this information to the one retrieved from the existing REST APIs.
- Models representing docks, container yards and warehouses can either be procedurally created or imported.

#### 3.3.3. As a Logistics Operator or Port Authority Officer, I want to see vessels and major resources (e.g., ship-to-shore cranes, yard gantry cranes) displayed in the 3D environment, so that I can visualize operational elements.

**Acceptance Criteria / Comments:**

- Items must appear in default or assigned positions (e.g., docked vessel on its berth).
- The system must fetch required data from the existing REST APIs.
- Regarding resources, consider only those that have an assigned area (e.g. dock A, Yard B).
- Regarding vessels, consider the information on the approved vessel visit notifications only.
- Models representing items can either be procedurally created or imported.

#### 3.3.4. As a System User, I want 3D models to be rendered with appropriate textures or visual styling, so that different port elements (e.g., docks, vessels, storage areas, cranes) are easily distinguishable.

**Acceptance Criteria / Comments:**

- Each category of 3D object (e.g., vessels, docks, storage areas, cranes) must have distinct textures and materials.
- Regarding procedurally created models, texture and material properties and locations must be retrieved from the backend as JSON-formatted content. Additionally, textures must include at least two maps: a color map and either a roughness map, a bump map, or a normal map.
- Textures or materials must not significantly degrade performance or loading time.

#### 3.3.5. As a System User, I want the 3D scene to have appropriate lighting, so that objects are clearly visible, realistically rendered, and easy to interpret in different viewing conditions.

**Acceptance Criteria / Comments:**

- The scene must include at least ambient and directional lighting to ensure visibility of all 3D objects.
- Lighting should enhance depth perception and object contours without causing overexposure or darkness.
- Shadows or highlights must be used without causing significant performance degradation.
- The illumination setup must work consistently across zoom levels and camera angles.

#### 3.3.6. As a System User, I want to control a perspective camera using the mouse, so that I can freely explore the scene and inspect objects from different angles.

**Acceptance Criteria / Comments:**

- Mouse right-click-and-drag allows orbiting the camera around the scene’s current target.
- Mouse wheel allows dollying-in and -out within safe limits.
- Movements must feel responsive and smooth, without jitter or excessive sensitivity.

### 3.4. Scheduling & Planning

#### 3.4.1. As a Project Manager, I want the team to develop a dedicated back-end module that provides planning and scheduling algorithms through a RESTbased API, consuming information from the existing back-end modules, so that operational plans can be computed dynamically and consistently without duplicating data.

**Acceptance Criteria / Comments:**

- The module must expose its algorithms / functionalities through a REST-based API.
- The module must consume existing data from other back-end services via their exposed APIs (e.g., staff, resources).
- The module must not persist operational data — it only computes and returns scheduling results upon request.
- Input and output payloads must follow JSON format and use consistent identifiers with other modules (e.g., resource IDs).
- The module API must be properly documented (e.g. via OpenAPI/Swagger) and accessible.

#### 3.4.2. As a Logistics Operator, I want to generate a daily schedule for the loading and unloading operations of vessels arriving at the port on a given day, so that delays relative to desired departure times are minimized.

**Acceptance Criteria / Comments:**

- The objective of the scheduling algorithm is to minimize total delay between the actual completion and desired departure times of vessels.
- Currently, the scheduling algorithm must only consider:
    1. One vessel per dock at a time.
    2. One crane (system) per unloading/loading operation.
    3. One storage location for the unloading/loading operations.
    4. Availability of physical resources (crane) and qualified staff within their operational windows.
- The scheduling computation must be executed through the Planning & Scheduling back-end module, which consumes the required data (e.g., vessel arrivals/departures, resources, staff data) from other APIs.
- The scheduling process must be initiated through a dedicated interface on the SPA. This UI must:
    1. Allow the operator to specify the target date (day).
    2. Display the results in a summary table (e.g., vessel, start/end time, assigned crane, staff) and, if feasible, through a timeline approach.
    3. Provide feedback on progress and completion, including warnings about infeasibility (e.g., lack of resources or staff).
-  At this stage, results do not need to be persisted anywhere— they can be recomputed on demand.

#### 3.4.3. As a Logistics Operator, I want the team to analyze the computational complexity of the scheduling algorithm, so that I can understand its scalability, feasibility and efficiency.

**Acceptance Criteria / Comments:**

- The team must assess performance under different problem sizes (e.g., number of vessels, cranes, staff) when computing the optimal solution.
- The algorithm’s complexity class must be explained and justified.
- The findings must be summarized in a short technical report to support further optimization or heuristic development.

#### 3.4.4. As a Logistics Operator, I want an alternative scheduling algorithm for the loading and unloading operations of vessels arriving at the port on a given day, that produces a good (but not necessarily optimal) solution efficiently, so that the system can handle larger problem instances or time-constrained planning scenarios.

**Acceptance Criteria / Comments:**

- This algorithm must be available for selection on the dedicated interface of the SPA and reuse the same data inputs and interfaces defined for the existing scheduling module.
- This algorithm must aim to minimize vessel departure delays but prioritize computational efficiency over optimality. Suitable approaches may include greedy strategies, local search, or other informed heuristics.
- Results must be comparable (e.g., total delay, computation time) against the previous algorithm using summary metrics.
- At this stage, results do not need to be persisted anywhere— they can be recomputed on demand.

#### 3.4.5. As a Logistics Operator, I want the scheduling module to support the use of multiple cranes when a single-crane solution cannot eliminate vessel departure delays, so that total delay is minimized while using additional cranes only when strictly necessary.

**Acceptance Criteria / Comments:**

- The system must first attempt to generate a schedule using a single-crane allocation strategy.
- If the computed schedule still results in non-zero departure delays, the module must (automatically or optionally) re-evaluate the plan allowing multiple cranes per vessel.
- The multi-crane scheduling approach must aim to:
    - Minimize the total sum of vessel departure delays.
    - Minimize the additional time windows where more than one crane is required (i.e., minimize multi-crane usage intensity).
- The output must clearly indicate where and when additional cranes were allocated to meet schedule objectives.
- The operator must be able to compare results between single-crane and multi-crane strategies via summary metrics (e.g., total delay, number of crane-hours used).
- At this stage, results do not need to be persisted anywhere— they can be recomputed on demand.

### 3.5. Systems Administration & Business Continuity

#### 3.5.1. As a System Administrator, I want a systematic and automated deployment process for one of the system modules to a controlled DEI environment (e.g., VM or containerized setup), so that deployments can be validated regularly using the test plan.

**Acceptance Criteria / Comments:**

- Deployment must be executed through an automated pipeline.
- The process must include automated validation steps using the project’s defined test plan.
- Deployment logs and test results must be archived for traceability.
- The environment (e.g., VM or container) must be reproducible and isolated.
- The deployment schedule (e.g., nightly or weekly) must be configurable.

#### 3.5.2. As a System Administrator, I want access to the solution to be restricted to clients connected to the DEI internal network (wired or via VPN), so that the system remains secure and compliant with institutional access policies.

**Acceptance Criteria / Comments:**

- Network access must be enforced through, for instance, VPN or IP whitelisting, configured at the host or proxy level.
- Authentication must still be handled by the external IAM, but authorization is only granted if the client is within the approved network context.
- Unauthorized external access attempts must be logged and denied.
- This restriction applies to the development and staging environments.

#### 3.5.3. As a System Administrator, I want the list of allowed client endpoints (as defined in US 3.5.2) to be configurable by editing a simple text or configuration file, so that access control remains easy to maintain without redeployment.

**Acceptance Criteria / Comments:**

- The file format must be simple and well-documented.
- Changes to the list must take effect without requiring a system restart.
- Invalid configurations must be detected and logged.

#### 3.5.4. As a System Administrator, I want to define a public folder accessible to all registered users, where they can view shared resources such as port regulations, reports, and statistics.

**Acceptance Criteria / Comments:**

- The folder must be readable by all authenticated users but writable only by authorized administrators.
- The location and access permissions must be clearly documented.
- Access must be audited to ensure integrity and controlled distribution.

#### 3.5.5. As a System Administrator, I want to control and monitor logins to the remote shells of Linux-based systems, so that I can prevent and report potential unauthorized access or misuse.

**Acceptance Criteria / Comments:**

- User authentication shall be permitted only between 08:00 and 22:00 local time. Access attempts outside this period must be denied.
- Following any failed authentication attempt, the system shall require Google Authenticator for multi-factor authentication before allowing subsequent login attempts.
- In the event of more than three consecutive failed authentication attempts, the system shall automatically generate an email alert to the system administrator.

#### 3.5.6. As a System Administrator, I want to identify and quantify the risks associated with the developed solution, so that mitigation measures can be proposed to ensure operational resilience.

**Acceptance Criteria / Comments:**

- Risks must be categorized (e.g., technical, operational, security-related).
- Each risk must be assigned likelihood and impact ratings.
- Mitigation strategies and residual risk levels must be included.

#### 3.5.7. As a System Administrator, I want to define the Minimum Business Continuity Objective (MBCO) for the system and propose it to stakeholders, so that acceptable downtime and service degradation thresholds are formally established.

**Acceptance Criteria / Comments:**

- The MBCO must be defined in measurable terms (e.g., maximum downtime, minimum service capacity).
- The proposal must align with identified risks and backup/recovery capabilities.
- The defined MBCO must be reviewed and approved by project stakeholders.

#### 3.5.8. As a System Administrator, I want a backup strategy to be proposed, justified, and implemented that minimizes RPO (Recovery Point Objective) and WRT (Work Recovery Time), so that the system can be rapidly restored after a failure with minimal data loss.

**Acceptance Criteria / Comments:**

- The backup strategy must specify backup frequency, retention policy, and storage location (on-site/off-site).
- RPO and WRT values must be defined, justified, and achievable with the chosen approach.
-  Backup and restore procedures must be documented and validated through test recovery runs.

### 3.6. GDPR Awareness & Data Impact Understanding

This section focuses on ensuring GDPR compliance by clarifying how personal data is processed within the project and how the team must respond to potential data breaches.

#### 3.6.1. As a Project Manager, I want to ensure the team understands how the project handles personal data and how that processing may affect the different actors involved, so that all data operations comply with applicable data protection laws.

**Acceptance Criteria / Comments:**

- The team must clearly explain the project scope and its core functionalities in a brief and engaging way.
- The team must identify which personal data will be processed.
- The team must describe how that personal data will be processed.
- The team must identify the legal basis (or bases) for each type of personal data processing.

#### 3.6.2. As a Project Manager, I want the team to understand how to handle a personal data breach, so that any incident is assessed, documented, and notified in accordance with legal requirements.

**Acceptance Criteria / Comments:**

- The team must define what constitutes a personal data breach.
- The team must understand and document the notification requirements involving both the competent supervisory authority and the affected data subjects, as well as what information those notifications must contain.
- The team must identify the deadline for notifying a data breach that poses a risk to individuals' rights and freedoms.

### 3.7. Project Client Analysis

#### 3.7.1. As a Project Manager, I want the team to describe the main management control instruments used by the organization, so that we can understand how they support decision-making and monitoring of the company’s activities.

**Acceptance Criteria / Comments:**

- The team must identify and describe at least two management control instruments used in the organization, explaining their purpose and scope.
- The advantages, limitations and possible improvement opportunities of each instrument must be briefly discussed.

#### 3.7.2. As a Project Manager, I want the team to identify some KPI used at different management levels and justify their adequacy, so that we can understand how performance is measured and managed in relation to the organization’s objectives and activities.

**Acceptance Criteria / Comments:**

- At least one KPI per management level must be documented, justifying why it belongs to that level and indicating whether each one monitors an objective or an activity/process.
- Each KPI must include its purpose, calculation logic, and relevance in relation to the organization’s objectives or activities.

#### 3.7.3. As a Project Manager, I want the team to identify whether the organization uses management information systems and analyze their implications for management and decision-making.

**Acceptance Criteria / Comments:**

- The team must identify the existence (or absence) of management information systems used in the organization (e.g., ERP, CRM, SCM, etc.).
- The implications or consequences of system use (or non-use) must be described.

#### 3.7.4. As a Project Manager, I want the team to analyze the leadership styles present in the organization and their impact on organizational culture and performance, so that we can evaluate managerial dynamics.

**Acceptance Criteria / Comments:**

- The team must identify at least one leadership style in use, justifying.
- The implications of that leadership style on communication, motivation, decision-making and performance must be described.

#### 3.7.5. As a Project Manager, I want the team to identify motivational practices used by the organization, relating them to employee needs and reward mechanisms, so that we can understand how engagement is fostered.

**Acceptance Criteria / Comments:**

- Identified motivational practices must be categorized.
- Discuss the implications of identified motivational practices for the organization, considering their impact on performance, retention, organizational culture, and overall effectiveness.

#### 3.7.6. As a Project Manager, I want the team to document the organization’s HR policies and practices, so that we can assess the maturity of its HR management model.

**Acceptance Criteria / Comments:**

- Identify human resource management policies.
- Describe briefly the human resource management process (recruitment, selection, integration, etc.).

#### 3.7.7. As a Project Manager, I want the team to identify examples of how the organization contributes (or could contribute) to the United Nations (UN) Sustainable Development Goals (SDG), justifying their relevance, so that we can evaluate its social and environmental responsibility.

**Acceptance Criteria / Comments:**

- At least two SDGs must be identified, duly indicated by their respective designations, to which the organization contributes or could contribute, justifying.

#### 3.7.8. As a Project Manager, I want the team to provide examples of practices that promote productivity within the organization, justifying their impact, so that we can identify efficiency enablers.

**Acceptance Criteria / Comments:**

- Productivity practices may refer to process optimization, automation, incentives, or cultural aspects.
- Each practice must be linked to a concrete effect.
- If no formal practices are identified, recommendations must be made.

#### 3.7.9. As a Project Manager, I want the team to identify existing (or potential) circular economy practices within the organization and relate them to the ReSOLVE strategies (Regenerate, Share, Optimize, Loop, Virtualize, Exchange), so that we can assess how circular economy principles are integrated into its operations.

**Acceptance Criteria / Comments:**

- Each identified practice must be mapped to ReSOLVE strategies, briefly indicating its environmental, operational, or economic benefits.
- If no practices are identified, feasible actions or strategies should be suggested to support the organization's transition towards circularity.

## 4. [Sprint C](Sprint%20C/)

Sprint C focuses on evolving the decoupled system architecture and consolidating the existing core functional modules into a cohesive operational solution. In this sprint, a new Operations & Execution Management (OEM) module is introduced, while enhancing the Single-Page Application, the 3D visualization environment, and the Intelligent Scheduling and Planning Algorithms. Business Continuity and System Administration capabilities are also reinforced. Additionally, GDPR compliance and project client analysis are addressed to ensure the solution meets legal, operational, technological, and organizational expectations.

### 4.1. Operations & Execution Management

The Operations & Execution Management (OEM) module is responsible for managing execution data of port activities. It bridges the gap between operations planning and operations execution, allowing the system to record what actually happens during each vessel visit and how it differs from the planned schedule. Among others, this module aims to support:

- Operation Plans – CRUD for storing and updating scheduling results generated by the Planning & Scheduling component (i.e. the planned cargo operations).
- Vessel Visit Executions (VVE) – recording actual vessel arrivals, departures, and the real execution of cargo operations.
- Incidents & Incident Types – managing unexpected events or disruptions affecting operations and their classification.
- Complementary Tasks & Categories – logging non-cargo-related activities (e.g., inspections, maintenance, cleaning) that may occur during vessel visits and impact operational efficiency.

Collected data can later be used for analytics, reporting, and performance evaluation (e.g., comparing planned vs. actual execution times, identifying frequent delays, or analyzing incident impact).

#### 4.1.1. As a Project Manager, I want the team to develop Operations & Execution Management (OEM) module as an independent back-end service so that the system architecture remains modular, decentralized, and maintainable, allowing each component to evolve independently while ensuring seamless integration with existing modules.

**Acceptance Criteria / Comments:**

- This module must follow architectural good practices.
- It must expose a REST-based API with endpoints for CRUD operations on all managed business concepts.
- The API must be properly documented (e.g., Swagger/OpenAPI).
- Inter-module communication must occur exclusively via REST API calls — no direct database access.
- Authentication and authorization must be integrated and comply with the IAM-based, RBAC and ABAC approaches taken in Sprint B.

#### 4.1.2. As a Logistics Operator, I want to automatically generate and store Operation Plans for all Vessel Visit Notifications (VVNs) scheduled for a given day using one of the available scheduling algorithms, so that cargo operations are efficiently organized and can later be monitored or adjusted.

**Acceptance Criteria / Comments:**

- The operator must be able to select a target day for which Operation Plans will be generated.
- Operation Plans are generated by the Planning & Scheduling module, using the selected algorithm:
    - An Operation Plan aggregates all the (sequence of) operations related to a VVN.
    - Each plan must include, among others, the assigned resources, planned time windows for loading/unloading.
- The SPA must allow operators to initiate and view generated plans before saving them in the OEM module.
- For auditability purposes, the system must record some metadata such as creation date, author, algorithm used.

#### 4.1.3. As a Logistics Operator, I want to search and list Operation Plans for a given day or period, so that I can quickly review all scheduled activities within that timeframe.

**Acceptance Criteria / Comments:**

- The REST API must support querying Operation Plans by date range and/or vessel identifier.
- The SPA must provide a searchable and filterable table showing plan summaries (e.g., vessel, dock, start/end time, assigned resources).
- Results must be sortable (e.g., by start time, vessel name, or expected delay).

#### 4.1.4. As a Logistics Operator, I want to manually update the Operation Plan of a given VVN, so that last-minute adjustments (e.g., resource or timing changes) can be made when needed.

**Acceptance Criteria / Comments:**

- The REST API must provide update endpoints.
- The SPA must allow editing key plan fields (e.g., crane assignment, start/end time, staff).
- Changes must be validated and logged (date, author, reason for change).
- The system must alert the user if the updated plans introduce possible inconsistencies with related VVNs and resource availability (e.g., cranes or staff).

#### 4.1.5. As a Logistics Operator, I want to identify Vessel Visit Notifications (VVNs) that do not yet have an Operation Plan, so that missing plans can be easily detected and generated.

**Acceptance Criteria / Comments (revised):**

- The REST API must include an endpoint returning VVNs without an associated Operation Plan.
- The SPA must display these VVNs in a dedicated section or tab (“Missing Plans”).
- If one or more VVNs of a given day are missing an Operation Plan, the operator must be able to trigger regeneration of all Operation Plans for that day using the selected scheduling algorithm.
- For regenerated plans, the system must record some metadata such as creation date, author, algorithm used.
- Operators must be warned that regeneration plans will overwrite any existing plans for that day as soon as they are confirmed.

#### 4.1.6. As a Logistics Operator, I want to query, for a given period, the total allocation time of a specific resource (e.g., crane, dock, or staff), so that I can assess resource utilization and workload distribution.

**Acceptance Criteria / Comments:**

- The REST API must provide endpoints aggregating Operation Plan data by resource and period.
- Returned data must include total allocated time and number of operations.
- The SPA must display results in a summary table.
- Data must only include saved Operation Plans.

#### 4.1.7. As a Logistics Operator, I want to create a Vessel Visit Execution (VVE) record when a vessel arrives at the port, so that the actual start of operations can be logged and monitored.

**Acceptance Criteria / Comments:**

- The REST API must allow creating a new VVE referencing an existing VVN.
- Recorded fields must include vessel identifier, actual arrival time at the port, and creator user ID. An automatic VVE identifier must be also assigned, whose pattern is like VVN IDs.
- The SPA must easy the VVE creation using available VVN information.
- Once created, the VVE must be marked as “In Progress.”

#### 4.1.8. As a Logistics Operator, I want to update an in progress VVE with the actual berth time and dock used, so that discrepancies from the planned dock assignment are recorded.

**Acceptance Criteria / Comments:**

- The REST API must support update of berth time and dock ID.
- If the assigned dock differs from the planned one, a warning or note must be automatically added.
- All updates must be timestamped and logged for auditability.

#### 4.1.9. As a Logistics Operator, I want to update an in progress VVE with executed operations, so that the system reflects real execution progress and performance.

**Acceptance Criteria / Comments:**

- Executed operations (mainly) derive from planned operations, which may be used to easy recording execution of operations.
- The SPA must allow the operator to confirm or modify start/end times and resource usage.
- The corresponding planned operations must be marked as "started", "completed", or "delayed".
- Execution updates must be stored with timestamps and operator ID.
- Completion status must synchronize with the corresponding Operation Plan for comparison.

#### 4.1.10. As a Logistics Operator, I want to search and list VVEs over a given period or for a specific vessel, so that I can review execution history and analyze performance.

**Acceptance Criteria / Comments:**

- The REST API must support filtering VVEs by date range, vessel, or execution status.
- The SPA must present this data in a tabular or timeline view.
- Results must include key execution metrics (e.g., total turnaround time, berth occupancy time, waiting time for berthing, delays in arrival, departures and operations).

#### 4.1.11. As a Logistics Operator, I want to mark a VVE as completed by recording the vessel’s unberth time and port departure time, so that the visit lifecycle is correctly closed and operational statistics can be derived.

**Acceptance Criteria / Comments:**

- The SPA must provide an option to mark a VVE as “Completed.”
- To complete a VVE, the following information must be recorded:
    - Actual unberth time (when the vessel leaves the dock).
    - Actual port departure time (when the vessel exits port limits).
- Completion is only allowed if all associated cargo operations are recorded as finished.
- Once completed, the VVE becomes read-only, except for authorized corrections by admin users.
- The action must be logged (timestamp, user, any changes made) for audit purposes.

#### 4.1.12. As a Port Authority Officer, I want to manage the catalog of Incident Types so that the classification of operational disruptions remains standardized, hierarchical, and clearly distinct from complementary tasks.

**Acceptance Criteria / Comments:**

- The system must support hierarchical structuring of incident types (e.g., Fog is a subtype of Environmental Conditions), allowing grouping and filtering by parent type.
- CRUD operations for Incident Types must be available via the REST API.
- The SPA must provide an intuitive interface for listing, filtering, and managing these hierarchy of types.
- Each Incident Type must include a unique code (e.g., T-INC001), a name (e.g., Equipment Failure), a detailed description, a severity classification (e.g., Minor, Major, Critical).
- Examples of possible types:
    - Environmental Conditions: Fog, Strong Winds, Heavy Rain
    - Operational Failures: Crane Malfunction, Power Outage
    - Safety/Security Events: Security Alert

#### 4.1.13. As a Logistics Operator, I want to record and manage incidents that affect the execution of port operations, so that delays and operational disruptions can be accurately tracked, scoped, and analyzed.

**Acceptance Criteria / Comments:**

- CRUD operations for incidents must be available via the REST API.
- The SPA must allow:
    - Filtering and listing incidents by vessel, date range, severity, or status (active/resolved).
    - Quickly associating or detaching affected VVEs.
    - Highlighting active incidents that are currently impacting operations.
- Each incident record must include: a unique generated ID, a reference to its Incident Type, start and end timestamps (allowing ongoing incidents to be marked as active), a severity level (e.g., minor, major, critical), a free-text description, a responsible user (the creator).
- An incident may affect: (i) all ongoing VVEs; (ii) specific VVEs (manually selected); or (iii) upcoming VVEs (planned for later execution on the same day or period).
- When an incident is marked as resolved (i.e., end time is set), its duration must be computed automatically.

#### 4.1.14. As a Port Operations Supervisor, I want to manage the catalog of Complementary Task Categories so that non-cargo-related activities are consistently classified and can be properly recorded during vessel visits.

**Acceptance Criteria / Comments:**

- CRUD operations for Complementary Task Categories must be available via the REST API.
- The SPA must allow users to view, search, and manage these categories efficiently.
- Each category must include a unique code (e.g., CTC001), a name (e.g., Security Check, Hull Maintenance), and a brief description of the task type or context.
- Categories may optionally define a default duration or expected impact (e.g., typically 1h delay).
- Examples of possible categories:
    - Safety and Security: Onboard Security Check, Customs Inspection
    - Maintenance: Hull Repair, Equipment Calibration
    - Cleaning and Housekeeping: Deck Cleaning, Waste Removal

#### 4.1.15. As a Logistics Operator, I want to record and manage Complementary Tasks performed during vessel visits, so that non-cargo activities (e.g., inspections, cleaning, maintenance) can be tracked and correlated with operational efficiency.

**Acceptance Criteria / Comments:**

- A Complementary Task may either:
    - Run in parallel with ongoing cargo operations (e.g., inspection), or
    - Temporarily suspend execution of ongoing cargo operations until it is concluded (e.g., maintenance, safety procedure).
- CRUD operations for Complementary Tasks must be provided via the REST API.
- The SPA must provide:
    - A simple form to log or edit Complementary Tasks,
    - Filtering and listing Complementary Tasks by vessel, date range, or status.
    - Highlighting on going tasks that are currently impacting operations.
- Each task record must include: a unique generated ID, a reference to its Category, the responsible team or service, the start and end timestamps (time window), the completion status (e.g. ongoing, completed), the VVE on which the task is being performed.

### 4.2. 3D Visualization

Within this sprint, the 3D Visualization module is enhanced with interactive and data-driven features. Users can now select, inspect, and focus on port elements, visualize their operational status, and experience smooth camera and lighting transitions that improve spatial awareness and system usability.

#### 4.2.1. As a System User, I want to select a port facility by left-clicking on its 3D representation (object picking), so that the camera repositions horizontally to center the selected facility.

**Acceptance Criteria / Comments:**

- Object picking must detect mouse interactions with 3D models.
- Object picking must support multiple entity types (e.g., docks, storage areas).
- The camera must move horizontally to focus on the facility’s center point.
- Visual feedback (e.g., highlighting or outline) must confirm selection.

#### 4.2.2. As a Logistics Operator or Port Authority Officer, I want to select vessels and major operational resources by left-clicking on their 3D representations (object picking), so that I can inspect or monitor them in detail.

**Acceptance Criteria / Comments:**

- Object picking must detect mouse interactions with 3D models.
- Object picking must support multiple entity types (e.g., vessels, cranes).
- The camera must move horizontally to focus on the center point of the selected element.
- Visual feedback (e.g., highlighting or outline) must confirm element selection.

#### 4.2.3. As a System User, whenever I press the “i” key, I want to toggle an information overlay showing updated information about the currently selected element.

**Acceptance Criteria / Comments:**

- The overlay must appear or disappear when pressing the “i” key.
- The displayed data must reflect the latest known information retrieved from the back-end.
- The displayed data varies according to the system user role:
    - General data such as the name and description of the selected element are always displayed.
    - Restricted information such as facility status, vessel ETA, ETD and ongoing operations is just displayed for Port Authorities or Logistic Operators users.
- The overlay must not block camera interaction.

#### 4.2.4. As a Logistics Operator, I want to see the current operational status of vessels (e.g., waiting, loading, unloading) visually represented in the 3D environment, so that I can quickly assess the port’s operational state.

**Acceptance Criteria / Comments:**

- Status changes must be reflected visually (e.g., color coding, icons, or animation).
- A tooltip must clarify each visual indicator’s meaning.
- Data must be periodically refreshed from the back-end (e.g., via REST call or WebSocket).

#### 4.2.5. As a System User, whenever I select a different element, I want a dynamic spotlight to follow the camera and illuminate the selected element’s center point, so that the visualization is visually focused and contextually clear <span style="background-color: yellow;">(only for groups with four or more elements)</span>.

**Acceptance Criteria / Comments:**

- The spotlight must update its target dynamically to the selected element.
- There must be a clearly visible penumbra.

#### 4.2.6. As a System User, whenever I select a different element, I want the camera and the spotlight to move smoothly instead of instantly, so that transitions feel natural and continuous <span style="background-color: yellow;">(only for groups with five or more elements)</span>.

**Acceptance Criteria / Comments:**

- Camera and light transitions must use animations, which can either be created or defined using some API (e.g., tween.js).
- Transition duration and easing may be configurable for testing.
- Animations must remain responsive and not block user input.

#### 4.2.7. As a System User, I want to reset the camera to a default overview position, so that I can quickly regain spatial context after multiple interactions.

**Acceptance Criteria / Comments:**

- The reset action must return the camera to a predefined viewpoint (e.g., full port view).
- The reset action may be available using a keyboard shortcut (e.g., “R” key) or button.
- Transition to this position must use smooth animation <span style="background-color: yellow;">(only for groups with five or more elements)</span>.
- The function must always remain available, regardless of current selection.

### 4.3. Scheduling & Planning

This section extends the Planning & Scheduling module with advanced and exploratory functionalities, introducing generative algorithms for adaptive optimization and researching emerging AI and automation technologies to support future innovation in port operations.

#### 4.3.1. As a Logistics Operator, I want the scheduling module to include a genetic algorithm–based approach to generate optimized daily operation plans, so that the system can explore broader solution spaces and achieve improved or near-optimal schedules under complex conditions.

**Acceptance Criteria / Comments:**

- The genetic algorithm must have the same goals, adopt the same data model and interfaces and must conform the same operational constraints as the algorithms developed in Sprint B.
- It must allow tuning key parameters (e.g., population size, number of generations, mutation rate, desire time for solution).
- Performance and result quality (e.g., total delay, computation time) must be comparable against existing algorithms.
- This algorithm must be available for selection on the dedicated interface of the SPA.
- The genetic algorithm must be capable of generating either single-crane or multiple-crane solutions, based on the operator’s selection in the SPA and considering the constraints of each dock.
- The algorithm must produce per-dock vessel unloading and loading sequences that respect crane availability and capacity limitation for each dock.

#### 4.3.2. As a Logistics Operator, I want the system to automatically select the most suitable scheduling algorithm (optimal, heuristic, or genetic) based on the problem size and available computation time, so that planning remains efficient and responsive in different operational contexts.

**Acceptance Criteria / Comments:**

- The module must evaluate the problem scale (e.g., number of vessels, cranes, operations) and defined time limits for computation.
- An algorithm selection policy must be implemented as, for example:
    - Use the optimal algorithm for small instances.
    - Use the heuristic algorithm for medium instances.
    - Use the genetic algorithm for large or time-constrained cases.
- The selected approach must be explicitly indicated in the returned plans and in logs for traceability.
- This algorithm must be available for selection on the dedicated interface of the SPA, being the one selected by default.

#### 4.3.3. As a Port Authority Officer, I want the system to rebalance the distribution of approved Vessel Visit Notifications across available docks for a given day, so that dock assignments are optimized to minimize expected vessel departure delays while considering dock capacity and crane availability.

**Acceptance Criteria / Comments:**

- The rebalancing process applies only to Vessel Visit Notifications already approved and assigned to a provisional dock (cf. US 2.2.7).
- The system must evaluate whether the existing dock assignments for the selected day result in poor balance, excessive congestion, or avoidable delays.
- The rebalancing algorithm may reassign vessels to different docks while respecting, among others: (i) vessel characteristics; (ii) dock capacity and size constraints; and (iii) the number and availability of cranes at each dock.
- The operator must be able to review proposed reassignments before confirming them. The SPA must present a summary comparing the initial dock allocation, the proposed allocation and the expected performance improvement (e.g., reduced delays).
- Reassignments must be logged with timestamp, officer ID, and the original and updated dock allocations.
- Rebalanced dock assignments must be applied before the Logistics Operator generates daily operation plans (i.e., before running the scheduling algorithms).

#### 4.3.4. As a Project Manager, I want the team to study the state of the art and potential applications of Robotics and Computer Vision in port logistics and administration, so that emerging technologies can be evaluated for future integration into the system.

**Acceptance Criteria / Comments:**

- The study must review practical applications such as autonomous cranes, automated cargo inspection, and surveillance or safety monitoring using computer vision.
- The analysis must describe technical enablers, data requirements, and expected operational impacts.
- Findings must be summarized in a short-written report (2-3 pages) including references and diagrams or examples.
- The report must include a brief reflection on how such technologies could interface with the current system’s architecture and APIs.

#### 4.3.5. As a Project Manager, I want the team to produce a short explanatory video that illustrates how the developed system schedules and sequences vessel loading and unloading operations at port docks, so that stakeholders can clearly understand the logic, user interaction, and operational benefits of the solution.

**Acceptance Criteria / Comments:**

- The video must illustrate how vessel loading/unloading plans are generated using the scheduling algorithms developed in the project, highlighting key concepts and principles.
- The video may be generated or enhanced using Generative AI tools.
- The video must be short (indicatively 1–3 minutes) and suitable for presentation to nontechnical stakeholders.
- The video must be produced in a standard common format (e.g., MP4).

### 4.4. Systems Administration & Business Continuity

Within this sprint the focus is on strengthening system administration, resilience, and business continuity by ensuring secure access, automated backups, verified recovery, and infrastructure readiness aligned with defined continuity objectives.

#### 4.4.1. As a Project Manager, I want the team to create a Disaster Recovery (DR) plan that meets the Minimum Business Continuity Objective (MBCO) defined in Sprint B, so that the system can recover operations within the expected thresholds.

**Acceptance Criteria / Comments:**

- The DR plan must include documented recovery procedures, validated through at least one simulated recovery test.
- The recovery time and recovery point achieved must meet or exceed the MBCO metrics.

#### 4.4.2. As a Project Manager, I want the team to document and justify the infrastructure requirements (and adjustments) that enable the system to achieve a Maximum Tolerable Downtime (MTD) of 20 minutes, so that the solution aligns with critical availability requirements.

**Acceptance Criteria / Comments:**

- Proposed infrastructure (e.g., hardware, network, or deployment configuration) must be described and justified technically.
- Impact on cost, performance, and maintainability must be assessed.

#### 4.4.3. As a Project Manager, I want the team to perform and present a Business Impact Analysis (BIA) of the final solution, updating and adapting the risks identified in Sprint B, so that the continuity strategy remains relevant and evidence-based.

**Acceptance Criteria / Comments:**

- The BIA must identify potential business impacts for each critical system component.
- Risks previously identified must be reviewed and reclassified (mitigated, residual, or new).
- Findings must be summarized in a short, structured document (tables or matrix preferred).

#### 4.4.4. As a System Administrator, I want access management to be validated and adjusted to comply with the security policies, so that the system enforces least-privilege and prevents unauthorized access.

**Acceptance Criteria / Comments:**

- All access rules (e.g., by user role) must be tested in staging environment.
- Access logs must record successful and failed access attempts.
- Security review report must confirm that access policies align with GDPR and institutional requirements.

#### 4.4.5. As a Project Manager, I want the team to implement a justified clustering or load-balancing solution for the SPA deployment, so that the system can maintain availability under increased load or node failure.

**Acceptance Criteria / Comments:**

- The chosen approach (e.g., Nginx reverse proxy, container orchestration, or VM-level clustering) must be documented and justified.
- Failover and load distribution must be demonstrated under test conditions.
- Performance results and system behavior under simulated node failure must be recorded.

#### 4.4.6. As a System Administrator, I want to create an automated script that generates backup copies of the database(s) to a cloud environment, using the filename format <db_name>_yyyymmdd, so that all backups are traceable and easily identifiable by creation date.

**Acceptance Criteria / Comments:**

- The backup script must run automatically (e.g., via cron or systemd timer).
- Backup filenames must strictly follow the <db_name>_yyyymmdd format (year/month/day).
- Successful and failed backups must be logged with timestamps.
- Backup location and credentials must follow security best practices (e.g., stored in environment variables or config files outside version control).

#### 4.4.7. As a System Administrator, I want an automated script to manage database backup file retention, ensuring the following policy is applied: one backup per month for the last year, one per week for the last month, and one per day for the last week, so that storage remains optimized and compliant with retention rules.

**Acceptance Criteria / Comments:**

- The script must delete or archive old backups according to the defined schedule.
- All deletions and retention actions must be logged.

#### 4.4.8. As a System Administrator, I want the database backup process to log all events in the Linux system logs and trigger an alert message upon administrator login if a critical backup failure occurs, so that issues can be promptly detected and resolved.

**Acceptance Criteria / Comments:**

- Backup script must log with appropriate severity levels (e.g., INFO, ERROR).
- If a backup fails, an alert message must appear at next terminal login.
- The alert mechanism must clear automatically after the next successful backup.

#### 4.4.9. As a System Administrator, I want automatic deletion of daily backup copies older than seven days, except for backups retained under monthly and yearly retention rules, so that storage usage remains efficient and consistent with policy.

**Acceptance Criteria / Comments:**

- The deletion rule must exclude monthly and annual retained copies.
- Deletion operations must be timestamped in the system logs.
- The rule must run automatically and not require manual intervention.

#### 4.4.10. As a System Administrator, I want SSH access to the virtual machine to be allowed only via certificate-based authentication and never via password, so that system access remains secure and auditable.

**Acceptance Criteria / Comments:**

- SSH password authentication must be disabled.
- Administrator access must require a valid authorized public key.
- Access changes must be tested and documented (e.g., connection test after configuration).

#### 4.4.11. As a System Administrator, I want to configure a shared network directory using SMB/CIFS or NFS, so that teams can easily exchange files efficiently and securely.

**Acceptance Criteria / Comments:**

- The shared folder must have appropriate permissions and access controls.
- Connection instructions for both Linux and Windows clients must be provided.
- Usage of the share must comply with institutional data handling policies.

#### 4.4.12. As a System Administrator, I want to automate the restoration and validation of database backups to ensure their integrity and usability, so that recovery reliability can be guaranteed when needed.

**Acceptance Criteria / Comments:**

- A recovery test script must automatically restore a recent backup into a temporary database.
- The test must execute a predefined query (or equivalent validation) to confirm the data integrity.
- Results (success/failure) must be logged, and failures must trigger an alert like the one being requested in <span style="background-color: yellow;">US 4.4.8</span>.

### 4.5. GDPR Awareness & Data Impact Understanding

This section ensures the system complies with the fundamental principles of the GDPR, particularly transparency, fairness, and accountability in data processing. It focuses on clarifying how personal data, whether collected directly from system users or indirectly from external sources such as vessel manifests, is handled, for what purposes, for how long, and under what rights. These measures aim to strength user trust and demonstrate due diligence regarding privacy and lawful processing.

#### 4.5.1. As an Administrator, I want to publish and manage the system’s Privacy Policy so that data subjects are always informed of the current rules governing data collection and processing.

**Acceptance Criteria / Comments:**

- The system must maintain the current version and an archived history of previous policies, each with timestamps to ensure traceability and auditability.
- A change in the policy must trigger a system user notification upon next login - evidence of the implementation must be provided.
- The Privacy Policy must be accessible from the SPA (e.g., footer) - evidence of the implementation must be provided.

#### 4.5.2. As a System User or Data Subject indirectly affected by the system, I want to have clear and accessible information about what personal data is collected, its purpose, how long the data is kept and the rights applicable under GDPR, so that all individuals whose data is processed are properly informed.

**Acceptance Criteria / Comments:**

- The system must provide a “Privacy Policy” section accessible from the SPA to both registered and non-registered users.
- The “Privacy Policy” content must
    - Fully comply with the GDPR, namely its article 13 and 14.
    - Include a dedicated subsection for non-user personal data (e.g., vessel crew) describing data sources, processing context and legal basis.
    - Be concise, transparent, and written in clear, plain language.
- Changes to this information must be version-controlled and traceable.

#### 4.5.3. As a System User, I want to request access, rectification, or deletion of my personal data so that I can exercise my GDPR rights transparently and efficiently.

**Acceptance Criteria / Comments:**

- The SPA must include a “Data Rights” section under the user profile area with options to:
    - Request a copy of stored personal data (downloadable as JSON or PDF) - evidence of the implementation must be provided.
    - Request correction or deletion of specific data fields- evidence of the implementation must be provided.
- Each request must be logged and acknowledged to the user (e.g., via on-screen message and/or e-mail) - evidence of the implementation must be provided.

#### 4.5.4. As a Non-System User, I want to know how to request access, rectification, or deletion of my personal data, so that I can effectively exercise my rights under GDPR.

**Acceptance Criteria / Comments:**

- The “Privacy Policy” must clearly explain how non-user data subjects can exercise their rights.

### 4.6. Project Client Analysis

#### 4.6.1. As a Project Manager, I want the team to identify the market segment(s) for one of the organization’s products, so that we can better understand the target customers and their characteristics.

**Acceptance Criteria / Comments:**

- Identify the market segment(s) for one of the organization’s products.
- Describe their main characteristics.

#### 4.6.2. As a Project Manager, I want the team to develop the marketing-mix for the previously selected product, so that we can evaluate the consistency of its design, delivery, and communication strategy.

**Acceptance Criteria / Comments:**

- Analyze the variables of the marketing mix and provide clear, concise, and well-reasoned justification for the decisions proposed for each variable.
- Ensure coherence between the different elements of the marketing mix.

#### 4.6.3. As a Project Manager, I want the team to obtain and analyze the organization’s Balance Sheet (BS) and Income Statement (IS), so that we can understand its economic and financial situation.

**Acceptance Criteria / Comments:**

- Include the financial statements (BS and IS) within the report.
- Analyze and comment on the changes in the main items of the BS and IS between year n and year n-1.

#### 4.6.4. As a Project Manager, I want the team to assess the organization’s financial performance using ratio analysis, so that we can identify strengths and weaknesses in its financial management.

**Acceptance Criteria / Comments:**

- Calculate and interpret the main financial ratios.
- Relate the results to the Balance Sheet and Income Statement analysis.
- Highlight the most relevant conclusions.

#### 4.6.5. As a Project Manager, I want the team to identify the main elements of the organization’s supply chain, so that we can understand the flow of materials and information from suppliers to the final customer.

**Acceptance Criteria / Comments:**

- Describe the sequence of main suppliers, logistics processes, and customers.
- Include a graphic representation of the supply chain when possible.
- Comment on the complexity and extension of the chain.

#### 4.6.6. As a Project Manager, I want the team to characterize the production system of one of the organization’s goods or services, so that we can understand how production is organized and aligned with market needs.

**Acceptance Criteria / Comments:**

- For goods: indicate how production is organized in relation to the market (made-to-order or for stock). Specify how production is organized according to volume and variety (unit, batch, etc.). Identify the type of production system used for one of the organization’s products (by product, by process, etc.).
- For services: describe customer involvement level (neutral, permeable, etc.) and the productive approach (production line, self-service, etc.).

#### 4.6.7. As a Project Manager, I want the team to prepare a final summary of the organization’s analysis and present improvement recommendations, so that we can evaluate the overall quality of management and propose future development paths.

**Acceptance Criteria / Comments:**

- Present a concise and integrated summary of the main conclusions drawn from the different areas analyzed.
- Demonstrate a critical and forward-looking view of the organization’s management, assessing what works well, what needs improvement, and identifying future challenges and opportunities, based on the evidence collected throughout the analysis.

### 4.7. Additional Remarks

Considering the existence of teams of varying sizes (due to distinct number of members) and the legitimate concerns of some project stakeholders, the project manager deems it appropriate to outline how the OEM workload should be distributed among team members. To this end, Table 2 presents the OEM user stories that are mandatory for each team member (marked with an “X”).

Furthermore, the team must also consider other guidelines provided, either along with the user stories and/or in the project's general operating guidelines.

<p align="center">TABLE 2. MANDATORY OEM USER STORIES FOR EVERY TEAM MEMBER.</p>

<table>
    <thead>
        <tr>
            <th rowspan="2">User Stories (ID)</th>
            <th colspan="5">Team Composition</th>
        </tr>
        <tr>
            <th>Member 1</th>
            <th>Member 2</th>
            <th>Member 3</th>
            <th>Member 4</th>
            <th>Member 5</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>4.1.1 </td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td></tr>
        <tr><td>4.1.2 </td><td>X</td><td>X</td><td> </td><td> </td><td> </td></tr>
        <tr><td>4.1.3 </td><td> </td><td>X</td><td>X</td><td> </td><td> </td></tr>
        <tr><td>4.1.4 </td><td>X</td><td> </td><td>X</td><td> </td><td> </td></tr>
        <tr><td>4.1.5 </td><td> </td><td> </td><td> </td><td>X</td><td> </td></tr>
        <tr><td>4.1.6 </td><td> </td><td> </td><td> </td><td> </td><td>X</td></tr>
        <tr><td>4.1.7 </td><td> </td><td> </td><td>X</td><td> </td><td> </td></tr>
        <tr><td>4.1.8 </td><td> </td><td>X</td><td> </td><td> </td><td> </td></tr>
        <tr><td>4.1.9 </td><td>X</td><td> </td><td> </td><td> </td><td> </td></tr>
        <tr><td>4.1.10</td><td> </td><td> </td><td> </td><td>X</td><td> </td></tr>
        <tr><td>4.1.11</td><td> </td><td> </td><td> </td><td> </td><td>X</td></tr>
        <tr><td>4.1.12</td><td>X</td><td>X</td><td> </td><td> </td><td> </td></tr>
        <tr><td>4.1.13</td><td>X</td><td> </td><td>X</td><td> </td><td> </td></tr>
        <tr><td>4.1.14</td><td> </td><td>X</td><td>X</td><td> </td><td> </td></tr>
        <tr><td>4.1.15</td><td> </td><td> </td><td> </td><td>X</td><td>X</td></tr>
    </tbody>
</table>
