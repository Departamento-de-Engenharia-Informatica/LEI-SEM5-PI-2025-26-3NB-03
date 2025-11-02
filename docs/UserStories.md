# [INTEGRATIVE PROJECT OF THE 5TH SEMESTER OF LEI-ISEP](README.md)
## 2025-2026 (version III.b)

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
        <tr><td>Dock</td><td></td><td>X</td><td></td><td></td><td></td></tr>
        <tr><td>Qualification</td><td></td><td></td><td>X</td><td>X</td><td></td></tr>
        <tr><td>Resource</td><td></td><td></td><td>X</td><td></td><td></td></tr>
        <tr><td>Shipping Agent Organization</td><td></td><td></td><td></td><td></td><td>X</td></tr>
        <tr><td>Shipping Agent Representative</td><td></td><td></td><td></td><td></td><td>X</td></tr>
        <tr><td>Staff Member</td><td></td><td></td><td></td><td>X</td><td></td></tr>
        <tr><td>Storage Area</td><td>X</td><td>X</td><td>X</td><td>X</td><td></td></tr>
        <tr><td>Vessel</td><td>X</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>Vessel Type</td><td>X</td><td>X</td><td></td><td></td><td></td></tr>
        <tr><td>Vessel Visit Notification</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td></tr>
    </tbody>
</table>

According to this table, for example, the first team member is solely responsible for the functionalities involving the Vessel concept and shares (equally) responsibilities with the second team member regarding the functionalities involving the Vessel Type concept. Furthermore, (s)he assumes shared responsibilities with the other team members regarding Storage Area and Vessel Visit Notification. A similar analysis should be performed for the remaining team members. When the team lacks a member (e.g., the fifth and, in some cases, also the fourth), the solely responsibilities of the absent members may not be fulfilled by the team. However, the team must ensure that the remaining responsibilities, that is, the responsibilities shared with the absent members, are fulfilled.<br><br>
By complying with these general rules, the team is ensuring a smooth running of the project for sprint B and C.

## 3. Sprint B

To be defined.

## 4. Sprint C

To be defined.