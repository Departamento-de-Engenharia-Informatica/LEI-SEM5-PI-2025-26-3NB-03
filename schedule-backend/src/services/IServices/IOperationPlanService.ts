import { Result } from "../../core/logic/Result";
import {IOperationPlanDTO, IUpdateOperationPlanDTO} from "../../dto/IOperationPlanDTO";

export default interface IOperationPlanService {
    createOperationPlan(dto: any): Promise<Result<IOperationPlanDTO>>;
    getOperationPlans(vesselId?: string, date?: string): Promise<Result<IOperationPlanDTO[]>>;
    updateOperationPlan(dto: IUpdateOperationPlanDTO): Promise<Result<IOperationPlanDTO>>;
}