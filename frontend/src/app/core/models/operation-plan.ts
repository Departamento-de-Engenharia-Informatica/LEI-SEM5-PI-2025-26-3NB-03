export interface OperationStep {
  operationId: string;
  type: string;
  containerNumber: string;
  resourceId: string;
  startTime: string;
  endTime: string;
}

export interface OperationPlan {
  id: string;
  vvnId: string;
  vesselId: string;
  date: string;
  status: string;
  operations: OperationStep[];
}

export interface CreateOperationPlanDto {
  vvnId: string;
  vesselId: string;
  date: string;
  algorithm?: string;
}

export interface UpdateOperationPlanDto {
  id: string;
  date?: string;
  vesselId?: string;
  status?: string;
  operations?: OperationStep[];
}
