export interface IOperationPlanDTO {
    id: string;
    vvnId: string;
    vesselId: string;
    date: string;
    operationType: string;
    status: string;
}


export interface IOperationPlanFiltersDTO {
    date?: string;
    vesselId?: string;
}

export interface IUpdateOperationPlanDTO {
    id: string;
    date?: string;
    vesselId?: string;
    status?: string;
}