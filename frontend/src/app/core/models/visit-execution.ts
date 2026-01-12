export interface VisitExecution {
  id: string;
  vvnId: string;
  vesselId: string;
  arrivalTime: string;
  status: string;
  creatorId: string;
}

export interface CreateVisitExecutionDto {
  vvnId: string;
  vesselId: string;
  arrivalTime: string;
  creatorId: string;
}

export interface UpdateVisitExecutionDto {
  arrivalTime?: string;
  status?: string;
}

export interface AuditLogDto {
  entityId: string;
  entityType: string;
  action: string;
  operatorId: string;
  timestamp: string;
  details?: any;
}