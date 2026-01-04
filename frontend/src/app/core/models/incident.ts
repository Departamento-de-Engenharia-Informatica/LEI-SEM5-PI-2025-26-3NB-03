export interface Incident {
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
}
