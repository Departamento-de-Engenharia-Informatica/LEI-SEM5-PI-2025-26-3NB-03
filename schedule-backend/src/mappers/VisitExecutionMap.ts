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
  const arrivalIso =
    t.arrivalTime instanceof Date ? t.arrivalTime.toISOString() : t.arrivalTime;

  const visitExecutionOrError = VisitExecution.create(
    {
      vvnId: t.vvnId,
      vesselId: t.vesselId,
      arrivalTime: arrivalIso,
      creatorId: t.creatorId
    },
    new UniqueEntityID(t.domainId)
  );

  if (visitExecutionOrError.isFailure) {
    const err = visitExecutionOrError.errorValue();
    throw new Error(typeof err === 'string' ? err : JSON.stringify(err));
  }

  const execution = visitExecutionOrError.getValue();

  // repor status vindo da BD (create força IN_PROGRESS)
  (execution as any).props.status = t.status;

  return execution;
}   

    public static toPersistence(t: VisitExecution): any {
        return {
            domainId: t.id.toString(),
            vvnId: t.vvnId,
            vesselId: t.vesselId,
            arrivalTime: t.arrivalTime,
            status: t.status,
            creatorId: (t as any).props.creatorId
        }
    }
}