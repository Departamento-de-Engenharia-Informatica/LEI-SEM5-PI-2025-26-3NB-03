export interface IOperationPlanPersistence {
    domainId: string;
    vvnId: string;
    vesselId: string;
    date: Date;
    status: string;
    operations: Array<{
        operationId: string;
        type: string;
        containerNumber: string;
        resourceId: string;
        startTime: Date;
        endTime: Date;
    }>;
}