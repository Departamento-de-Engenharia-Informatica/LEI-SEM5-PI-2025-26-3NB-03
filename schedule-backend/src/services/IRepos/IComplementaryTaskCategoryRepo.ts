import { Repo } from "../../core/infra/Repo";
import { ComplementaryTaskCategory } from "../../domain/complementaryTaskCategory";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

export default interface IComplementaryTaskCategoryRepo extends Repo<ComplementaryTaskCategory> {
    save(category: ComplementaryTaskCategory): Promise<ComplementaryTaskCategory>;
    findByDomainId(categoryId: UniqueEntityID | string): Promise<ComplementaryTaskCategory>;
    findAll(): Promise<ComplementaryTaskCategory[]>;
    findByName(name: string): Promise<ComplementaryTaskCategory>;
}