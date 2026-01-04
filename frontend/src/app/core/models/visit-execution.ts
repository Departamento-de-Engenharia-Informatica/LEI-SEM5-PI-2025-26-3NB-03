export interface VisitExecution {
  id: string;
  vvnId: string;
  vesselId: string;
  dockId: string;
  arrivalTime: string;
  status: string;
  creatorId: string;
}

export interface CreateVisitExecutionDto {
  vvnId: string;
  vesselId: string;
  dockId: string;
  arrivalTime: string;
  creatorId: string;
}
