import { Repo } from "../../core/infra/Repo";
import { VisitExecution } from "../../domain/visitExecution";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

export default interface IVisitExecutionRepo extends Repo<VisitExecution> {
    save(visitExecution: VisitExecution): Promise<VisitExecution>;
    findByDomainId(visitExecutionId: UniqueEntityID | string): Promise<VisitExecution>;
    findAll(): Promise<VisitExecution[]>;
}