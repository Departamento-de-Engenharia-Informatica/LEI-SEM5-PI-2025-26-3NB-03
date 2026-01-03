import { Service, Inject } from 'typedi';
import { Document, Model } from 'mongoose';
import { IVisitExecutionPersistence } from '../dataschema/IVisitExecutionPersistence';
import IVisitExecutionRepo from '../services/IRepos/IVisitExecutionRepo';
import { VisitExecution } from '../domain/visitExecution';
import { VisitExecutionMap } from '../mappers/VisitExecutionMap';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

@Service()
export default class VisitExecutionRepo implements IVisitExecutionRepo {
    private models: any;

    constructor(
        @Inject('visitExecutionSchema') private visitExecutionSchema: Model<IVisitExecutionPersistence & Document>,
    ) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(t: VisitExecution): Promise<boolean> {
        const idX = t.id instanceof UniqueEntityID ? (<UniqueEntityID>t.id).toValue() : t.id;
        const query = { domainId: idX };
        const visitDocument = await this.visitExecutionSchema.findOne(query as any);
        return !!visitDocument === true;
    }

    public async save(t: VisitExecution): Promise<VisitExecution> {
        const query = { domainId: t.id.toString() };
        const visitDocument = await this.visitExecutionSchema.findOne(query);

        try {
            if (visitDocument === null) {
                const rawVisit: any = VisitExecutionMap.toPersistence(t);
                const visitCreated = await this.visitExecutionSchema.create(rawVisit);
                return VisitExecutionMap.toDomain(visitCreated);
            } else {

                visitDocument.status = t.status;
                await visitDocument.save();
                return t;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(visitExecutionId: UniqueEntityID | string): Promise<VisitExecution> {
        const query = { domainId: visitExecutionId };
        const visitRecord = await this.visitExecutionSchema.findOne(query as any);
        if (visitRecord != null) {
            return VisitExecutionMap.toDomain(visitRecord);
        }
        return null;
    }

    public async findAll(): Promise<VisitExecution[]> {
        const query = {};
        const visitRecords = await this.visitExecutionSchema.find(query);
        return visitRecords.map((record) => VisitExecutionMap.toDomain(record));
    }
}