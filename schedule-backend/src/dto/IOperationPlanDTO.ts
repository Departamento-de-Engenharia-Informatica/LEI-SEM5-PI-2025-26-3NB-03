export interface IOperationStepDTO {
    operationId: string;
    type: string;
    containerNumber: string;
    resourceId: string;
    startTime: string;
    endTime: string;
}

export interface IOperationPlanDTO {
    id: string;
    vvnId: string;
    vesselId: string;
    date: string;
    status: string;
    operations: IOperationStepDTO[];
}

export interface ICreateOperationPlanDto {
    vvnId: string;
    vesselId: string;
    date: string;
    algorithm?: string;
}

export interface IUpdateOperationPlanDTO {
    id: string;
    date?: string;
    vesselId?: string;
    status?: string;
    operations?: IOperationStepDTO[];
}