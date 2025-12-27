import { Mapper } from "../core/infra/Mapper";
import { IVisitExecutionDTO } from "../dto/IVisitExecutionDTO";
import { VisitExecution } from "../domain/visitExecution";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class VisitExecutionMap extends Mapper<VisitExecution> {

    public static toDTO(t: VisitExecution): IVisitExecutionDTO {
        return {
            id: t.id.toString(),
            vvnId: t.vvnId,
            vesselId: t.vesselId,
            arrivalTime: t.arrivalTime.toISOString(),
            status: t.status
        } as IVisitExecutionDTO;
    }

    public static toDomain(t: any): VisitExecution {
        const visitExecutionOrError = VisitExecution.create({
            vvnId: t.vvnId,
            vesselId: t.vesselId,
            arrivalTime: t.arrivalTime,
            creatorId: t.creatorId
        }, new UniqueEntityID(t.domainId));

        visitExecutionOrError.isFailure ? console.log(visitExecutionOrError.error) : '';


        const execution = visitExecutionOrError.getValue();



        return execution;
    }

    public static toPersistence(t: VisitExecution): any {
        return {
            domainId: t.id.toString(),
            vvnId: t.vvnId,
            vesselId: t.vesselId,
            arrivalTime: t.arrivalTime,
            status: t.status,
            creatorId: "user-placeholder"
        }
    }
}