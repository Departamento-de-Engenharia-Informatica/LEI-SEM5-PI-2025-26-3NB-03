import { Result } from "../../core/logic/Result";
import { IOperationPlanDTO } from "../../dto/IOperationPlanDTO";

export default interface IOperationPlanService {
    createOperationPlan(dto: any): Promise<Result<IOperationPlanDTO>>;
    getOperationPlans(vesselId?: string, date?: string): Promise<Result<IOperationPlanDTO[]>>;
}