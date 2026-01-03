import { Mapper } from "../core/infra/Mapper";
import { OperationPlan } from "../domain/operationPlan";
import { IOperationPlanDTO, IOperationStepDTO } from "../dto/IOperationPlanDTO";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class OperationPlanMap extends Mapper<OperationPlan> {

    public static toDTO(plan: OperationPlan): IOperationPlanDTO {
        return {
            id: plan.id.toString(),
            vvnId: plan.vvnId,
            vesselId: plan.vesselId,
            date: plan.date.toISOString(),
            status: plan.status,
            operations: plan.operations.map(op => ({
                operationId: op.operationId,
                type: op.type,
                containerNumber: op.containerNumber,
                resourceId: op.resourceId,
                startTime: op.startTime.toISOString(),
                endTime: op.endTime.toISOString()
            }))
        } as IOperationPlanDTO;
    }

    public static toDomain(raw: any): OperationPlan | null {
        const planOrError = OperationPlan.create({
            vvnId: raw.vvnId,
            vesselId: raw.vesselId,
            date: raw.date,
            status: raw.status,
            operations: raw.operations ? raw.operations.map((op: any) => ({
                operationId: op.operationId,
                type: op.type,
                containerNumber: op.containerNumber,
                resourceId: op.resourceId,
                startTime: op.startTime,
                endTime: op.endTime
            })) : []
        }, new UniqueEntityID(raw.domainId));

        return planOrError.isSuccess ? planOrError.getValue() : null;
    }

    public static toPersistence(plan: OperationPlan): any {
        return {
            domainId: plan.id.toString(),
            vvnId: plan.vvnId,
            vesselId: plan.vesselId,
            date: plan.date,
            status: plan.status,
            operations: plan.operations.map(op => ({
                operationId: op.operationId,
                type: op.type,
                containerNumber: op.containerNumber,
                resourceId: op.resourceId,
                startTime: op.startTime,
                endTime: op.endTime
            }))
        };
    }
}