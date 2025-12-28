import { Repo } from "../../core/infra/Repo";
import { ComplementaryTask } from "../../domain/complementaryTask";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

export default interface IComplementaryTaskRepo extends Repo<ComplementaryTask> {
    save(task: ComplementaryTask): Promise<ComplementaryTask>;
    findByDomainId(taskId: UniqueEntityID | string): Promise<ComplementaryTask>;
    findByName(name: string): Promise<ComplementaryTask>; // Para verificar duplicados
    findAll(): Promise<ComplementaryTask[]>;
}