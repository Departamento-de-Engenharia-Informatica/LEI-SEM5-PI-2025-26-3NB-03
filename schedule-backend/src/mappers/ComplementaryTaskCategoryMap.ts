import { Mapper } from "../core/infra/Mapper";
import { IComplementaryTaskCategoryDTO } from "../dto/IComplementaryTaskCategoryDTO";
import { ComplementaryTaskCategory } from "../domain/complementaryTaskCategory";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class ComplementaryTaskCategoryMap extends Mapper<ComplementaryTaskCategory> {

    public static toDTO(t: ComplementaryTaskCategory): IComplementaryTaskCategoryDTO {
        return {
            id: t.id.toString(),
            name: t.name,
            description: t.description,
            active: t.isActive,
        } as IComplementaryTaskCategoryDTO;
    }

    public static toDomain(t: any): ComplementaryTaskCategory {
        const categoryOrError = ComplementaryTaskCategory.create({
            name: t.name,
            description: t.description,
            active: t.active
        }, new UniqueEntityID(t.domainId));

        categoryOrError.isFailure ? console.log(categoryOrError.error) : '';

        return categoryOrError.isSuccess ? categoryOrError.getValue() : null;
    }

    public static toPersistence(t: ComplementaryTaskCategory): any {
        return {
            domainId: t.id.toString(),
            name: t.name,
            description: t.description,
            active: t.isActive
        }
    }
}