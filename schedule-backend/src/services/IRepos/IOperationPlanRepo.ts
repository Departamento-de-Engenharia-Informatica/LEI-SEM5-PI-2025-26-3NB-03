import { Repo } from "../../core/infra/Repo";
import { OperationPlan } from "../../domain/operationPlan";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

export default interface IOperationPlanRepo extends Repo<OperationPlan> {
    save(operationPlan: OperationPlan): Promise<OperationPlan>;
    findByDomainId(planId: UniqueEntityID | string): Promise<OperationPlan>;

    findByFilters(vesselId?: string, date?: Date): Promise<OperationPlan[]>;
}