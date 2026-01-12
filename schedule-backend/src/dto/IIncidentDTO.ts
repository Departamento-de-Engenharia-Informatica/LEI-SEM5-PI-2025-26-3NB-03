export interface IIncidentDTO {
    id: string;
    title: string;
    description: string;
    incidentType: string;
    severity: 'MINOR' | 'MAJOR' | 'CRITICAL';
    status: 'ACTIVE' | 'RESOLVED';
    startTime: string;
    endTime?: string;
    durationMinutes?: number;
    affectedVVEs: string[];
    createdBy: string;
}

export interface ICreateIncidentDTO {
    title: string;
    description: string;
    incidentType: string;
    severity: string;
    startTime: string;
    affectedVVEs: string[];
    createdBy: string;
}

export interface IUpdateIncidentDTO {
    id: string;
    status?: string;
    endTime?: string;
    description?: string;
    severity?: string;
}