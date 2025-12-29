import { Mapper } from "../core/infra/Mapper";
import { IOperationPlanDTO } from "../dto/IOperationPlanDTO";
import { OperationPlan } from "../domain/operationPlan";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class OperationPlanMap extends Mapper<OperationPlan> {

    public static toDTO(t: OperationPlan): IOperationPlanDTO {
        return {
            id: t.id.toString(),
            vvnId: t.vvnId,
            vesselId: t.vesselId,
            date: t.date.toISOString(),
            operationType: t.operationType,
            status: t.status
        } as IOperationPlanDTO;
    }

    public static toDomain(t: any): OperationPlan {
        const operationPlanOrError = OperationPlan.create({
            vvnId: t.vvnId,
            vesselId: t.vesselId,
            date: t.date,
            operationType: t.operationType,
            status: t.status
        }, new UniqueEntityID(t.domainId));

        operationPlanOrError.isFailure ? console.log(operationPlanOrError.error) : '';

        return operationPlanOrError.isSuccess ? operationPlanOrError.getValue() : null;
    }

    public static toPersistence(t: OperationPlan): any {
        return {
            domainId: t.id.toString(),
            vvnId: t.vvnId,
            vesselId: t.vesselId,
            date: t.date,
            operationType: t.operationType,
            status: t.status
        }
    }
}