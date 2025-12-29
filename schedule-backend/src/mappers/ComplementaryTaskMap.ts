import { Mapper } from "../core/infra/Mapper";
import { IComplementaryTaskDTO } from "../dto/IComplementaryTaskDTO";
import { ComplementaryTask } from "../domain/complementaryTask";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class ComplementaryTaskMap extends Mapper<ComplementaryTask> {

    public static toDTO(t: ComplementaryTask): IComplementaryTaskDTO {
        return {
            id: t.id.toString(),
            name: t.name,
            description: t.description,
            categoryId: t.categoryId,
            active: t.isActive,
        } as IComplementaryTaskDTO;
    }

    public static toDomain(t: any): ComplementaryTask {
        const taskOrError = ComplementaryTask.create({
            name: t.name,
            description: t.description,
            categoryId: t.categoryId,
            active: t.active
        }, new UniqueEntityID(t.domainId));

        taskOrError.isFailure ? console.log(taskOrError.error) : '';

        return taskOrError.isSuccess ? taskOrError.getValue() : null;
    }

    public static toPersistence(t: ComplementaryTask): any {
        return {
            domainId: t.id.toString(),
            name: t.name,
            description: t.description,
            categoryId: t.categoryId,
            active: t.isActive
        }
    }
}