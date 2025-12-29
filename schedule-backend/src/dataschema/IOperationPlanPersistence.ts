export interface IOperationPlanPersistence {
    domainId: string;
    vvnId: string;
    vesselId: string;
    date: Date;
    operationType: string;
    status: string;
}