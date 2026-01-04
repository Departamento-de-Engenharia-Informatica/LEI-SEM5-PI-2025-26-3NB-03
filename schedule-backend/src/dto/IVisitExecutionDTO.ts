export interface IVisitExecutionDTO {
    id: string;
    vvnId: string;
    vesselId: string;
    arrivalTime: string;
    status: string;
}

export interface ICreateVisitExecutionDTO {
    vvnId: string;
    vesselId: string;
    arrivalTime: string;
    creatorId: string;
}

export interface IUpdateVisitExecutionDTO {
  arrivalTime?: string;
  status?: string;
}