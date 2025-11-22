## Mandatory Scope of Work for every Team Member

 - We decided to organize the members by the mechanographic number.
 - On a later date we decided to change the member 1 and 2 with each other, for a better workflow.

<table>
    <thead>
        <tr>
            <th rowspan="2">Scope of Work</th>
            <th colspan="5">Team Composition</th>
        </tr>
        <tr>
            <th>1050071</th>
            <th>1010947</th>
            <th>1080714</th>
            <th>1200614</th>
            <th>N/A</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Dock</td><td></td><td>X</td><td></td><td></td><td></td></tr>
        <tr><td>Qualification</td><td></td><td></td><td>X</td><td>X</td><td></td></tr>
        <tr><td>Physical Resource</td><td></td><td></td><td>X</td><td></td><td></td></tr>
        <tr><td>Shipping Agent Organization</td><td></td><td></td><td></td><td></td><td>X</td></tr>
        <tr><td>Representative</td><td></td><td></td><td></td><td></td><td>X</td></tr>
        <tr><td>Staff Member</td><td></td><td></td><td></td><td>X</td><td></td></tr>
        <tr><td>Storage Area</td><td>X</td><td>X</td><td>X</td><td>X</td><td></td></tr>
        <tr><td>Vessel</td><td>X</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>Vessel Type</td><td>X</td><td>X</td><td></td><td></td><td></td></tr>
        <tr><td>Vessel Visit Notification</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td></tr>
    </tbody>
</table>

To compensate for the lack of a fifth member, Shipping Agent Organization and Representative were given to 1080714.

## User Stories

### Names

User Stories are already numbered, but we gave them a short name so that they are more easily identifiable.

We assigned team members to User Stories following the Scope of Work.

| Number  | Short Name                             | Assignee |
|---------|----------------------------------------|----------|
| 2.2.1.  | Create/Update Vessel Type              | 1010947  |
| 2.2.2.  | Create/Update Vessel                   | 1050071  |
| 2.2.3.  | Create/Update Dock                     | 1010947  |
| 2.2.4.  | Create/Update Storage Area             | 1080714  |
| 2.2.5.  | Create Shipping Agent Organization     | 1080714  |
| 2.2.6.  | Create/Update Representative           | 1080714  |
| 2.2.7.  | Review Vessel Visit Notification       | 1010947  |
| 2.2.8.  | Create Vessel Visit Notification       | 1050071  |
| 2.2.9.  | Update Vessel Visit Notification       | 1050071  |
| 2.2.10. | View Vessel Visit Notifications Status | 1200614  |
| 2.2.11. | Create/Update Staff Member             | 1200614  |
| 2.2.12. | Create/Update Physical Resource        | 1080714  |
| 2.2.13. | Create/Update Qualification            | 1200614  |

### Tasks

We divided each User Story into three tasks. Analysis, Implementation and Tests.
The assignee of the User Story is responsable for it, but each individual task can be assigned to another team member.

## Priorities and dependencies

 1. **Vessel Type**, **Qualification** and **Representative** don't have dependencies and can be prioritized.

 2. **Dock** and **Vessel** depend on Vessel Type. **Staff Member** depends on Qualification. **Shipping Agent Organization** depends on Representative. These can be prioritized after those.
 
 3. **Storage Area** can depend on Dock, but by default, Dock can be ommited, so depending on how the workflow is going, can be done before Dock, but ideally Dock should be prioritized.

 4. **Physical Resource** depends on Qualification, but some resources can also depend on Storage Area, so depending on how the workflow is going, can be done before Storage Area, but ideally Storage Area should be prioritized.

 5. **Vessel Visit Notification** depends on both Representative and Vessel directly, but the Containers on the Cargo Manifest also depend on Storage Area.