import { Service, Inject } from 'typedi';
import { Document, Model } from 'mongoose';
import { IOperationPlanPersistence } from '../dataschema/IOperationPlanPersistence';
import IOperationPlanRepo from '../services/IRepos/IOperationPlanRepo';
import { OperationPlan } from '../domain/operationPlan';
import { OperationPlanMap } from '../mappers/OperationPlanMap';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

@Service()
export default class OperationPlanRepo implements IOperationPlanRepo {
    constructor(
        @Inject('operationPlanSchema') private planSchema: Model<IOperationPlanPersistence & Document>,
    ) {}

    public async exists(t: OperationPlan): Promise<boolean> {
        const idX = t.id instanceof UniqueEntityID ? (<UniqueEntityID>t.id).toValue() : t.id;
        const query = { domainId: idX };
        const planDocument = await this.planSchema.findOne(query as any);
        return !!planDocument === true;
    }

    public async save(t: OperationPlan): Promise<OperationPlan> {
        const query = { domainId: t.id.toString() };
        const planDocument = await this.planSchema.findOne(query);

        try {
            if (planDocument === null) {
                const rawPlan: any = OperationPlanMap.toPersistence(t);
                const planCreated = await this.planSchema.create(rawPlan);
                return OperationPlanMap.toDomain(planCreated);
            } else {
                planDocument.date = t.date;
                planDocument.vesselId = t.vesselId;
                planDocument.status = t.status;


                planDocument.operations = t.operations.map(op => ({
                    operationId: op.operationId,
                    type: op.type,
                    containerNumber: op.containerNumber,
                    resourceId: op.resourceId,
                    startTime: op.startTime,
                    endTime: op.endTime
                }));

                await planDocument.save();
                return t;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(planId: UniqueEntityID | string): Promise<OperationPlan> {
        const query = { domainId: planId };
        const planRecord = await this.planSchema.findOne(query as any);
        if (planRecord != null) {
            return OperationPlanMap.toDomain(planRecord);
        }
        return null;
    }

    public async findAll(): Promise<OperationPlan[]> {
        const planRecords = await this.planSchema.find();
        return planRecords.map(record => OperationPlanMap.toDomain(record));
    }

    public async findByFilters(vesselId?: string, date?: Date): Promise<OperationPlan[]> {
        const query: any = {};

        if (vesselId) {
            query.vesselId = vesselId;
        }

        if (date) {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);

            query.date = {
                $gte: startDate,
                $lte: endDate
            };
        }

        const planRecords = await this.planSchema.find(query);
        return planRecords.map(record => OperationPlanMap.toDomain(record));
    }
}