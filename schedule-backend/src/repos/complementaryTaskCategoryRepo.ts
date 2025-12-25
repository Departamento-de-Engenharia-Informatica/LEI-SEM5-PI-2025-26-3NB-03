import { Service, Inject } from 'typedi';
import { Document, Model } from 'mongoose';
import { IComplementaryTaskCategoryPersistence } from '../dataschema/IComplementaryTaskCategoryPersistence';
import IComplementaryTaskCategoryRepo from "../services/IRepos/IComplementaryTaskCategoryRepo";
import { ComplementaryTaskCategory } from "../domain/complementaryTaskCategory";
import { ComplementaryTaskCategoryMap } from "../mappers/ComplementaryTaskCategoryMap";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

@Service()
export default class ComplementaryTaskCategoryRepo implements IComplementaryTaskCategoryRepo {
    constructor(
        @Inject('complementaryTaskCategorySchema') private categorySchema : Model<IComplementaryTaskCategoryPersistence & Document>,
    ) {}

    public async exists(t: ComplementaryTaskCategory): Promise<boolean> {
        const idX = t.id instanceof UniqueEntityID ? (<UniqueEntityID>t.id).toValue() : t.id;
        const query = { domainId: idX };
        const categoryDocument = await this.categorySchema.findOne(query as any);
        return !!categoryDocument === true;
    }

    public async save(category: ComplementaryTaskCategory): Promise<ComplementaryTaskCategory> {
        const query = { domainId: category.id.toString() };
        const categoryDocument = await this.categorySchema.findOne(query);

        try {
            if (categoryDocument === null) {
                const rawCategory: any = ComplementaryTaskCategoryMap.toPersistence(category);
                const categoryCreated = await this.categorySchema.create(rawCategory);
                return ComplementaryTaskCategoryMap.toDomain(categoryCreated);
            } else {
                categoryDocument.name = category.name;
                categoryDocument.description = category.description;
                categoryDocument.active = category.isActive;
                await categoryDocument.save();
                return category;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(categoryId: UniqueEntityID | string): Promise<ComplementaryTaskCategory> {
        const query = { domainId: categoryId };
        const categoryRecord = await this.categorySchema.findOne(query as any);
        if(categoryRecord != null) return ComplementaryTaskCategoryMap.toDomain(categoryRecord);
        return null;
    }

    public async findAll(): Promise<ComplementaryTaskCategory[]> {
        const categoryRecords = await this.categorySchema.find();
        return categoryRecords.map(record => ComplementaryTaskCategoryMap.toDomain(record));
    }

    public async findByName(name: string): Promise<ComplementaryTaskCategory> {

        const query = { name: name };
        const categoryRecord = await this.categorySchema.findOne(query as any);

        if(categoryRecord != null) {
            return ComplementaryTaskCategoryMap.toDomain(categoryRecord);
        }
        return null;
    }
}