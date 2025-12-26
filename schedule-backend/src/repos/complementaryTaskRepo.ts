import { Service, Inject } from 'typedi';
import { Document, Model } from 'mongoose';
import { IComplementaryTaskPersistence } from '../dataschema/IComplementaryTaskPersistence';
import IComplementaryTaskRepo from '../services/IRepos/IComplementaryTaskRepo';
import { ComplementaryTask } from '../domain/complementaryTask';
import { ComplementaryTaskMap } from '../mappers/ComplementaryTaskMap';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

@Service()
export default class ComplementaryTaskRepo implements IComplementaryTaskRepo {
    private models: any;

    constructor(
        @Inject('complementaryTaskSchema') private taskSchema: Model<IComplementaryTaskPersistence & Document>,
    ) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(t: ComplementaryTask): Promise<boolean> {
        const idX = t.id instanceof UniqueEntityID ? (<UniqueEntityID>t.id).toValue() : t.id;
        const query = { domainId: idX };
        const taskDocument = await this.taskSchema.findOne(query as any);
        return !!taskDocument === true;
    }

    public async save(t: ComplementaryTask): Promise<ComplementaryTask> {
        const query = { domainId: t.id.toString() };
        const taskDocument = await this.taskSchema.findOne(query);

        try {
            if (taskDocument === null) {
                const rawTask: any = ComplementaryTaskMap.toPersistence(t);
                const taskCreated = await this.taskSchema.create(rawTask);
                return ComplementaryTaskMap.toDomain(taskCreated);
            } else {
                taskDocument.name = t.name;
                taskDocument.description = t.description;
                taskDocument.categoryId = t.categoryId;
                taskDocument.active = t.isActive;
                await taskDocument.save();
                return t;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(taskId: UniqueEntityID | string): Promise<ComplementaryTask> {
        const query = { domainId: taskId };
        const taskRecord = await this.taskSchema.findOne(query as any);
        if (taskRecord != null) {
            return ComplementaryTaskMap.toDomain(taskRecord);
        }
        return null;
    }

    public async findByName(name: string): Promise<ComplementaryTask> {
        const query = { name: name };
        const taskRecord = await this.taskSchema.findOne(query as any);
        if (taskRecord != null) {
            return ComplementaryTaskMap.toDomain(taskRecord);
        }
        return null;
    }
}