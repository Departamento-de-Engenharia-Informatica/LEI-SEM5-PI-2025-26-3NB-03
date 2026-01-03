import { Service, Inject } from 'typedi';
import { Result } from "../core/logic/Result";
import IOperationPlanService from './IServices/IOperationPlanService';
import { ICreateOperationPlanDto, IOperationPlanDTO, IUpdateOperationPlanDTO } from '../dto/IOperationPlanDTO';
import IOperationPlanRepo from './IRepos/IOperationPlanRepo';
import { OperationPlan } from '../domain/operationPlan';
import { OperationPlanMap } from '../mappers/OperationPlanMap';

@Service()
export default class OperationPlanService implements IOperationPlanService {
    constructor(
        @Inject('OperationPlanRepo') private planRepo: IOperationPlanRepo
    ) {}

    public async createOperationPlan(dto: ICreateOperationPlanDto): Promise<Result<IOperationPlanDTO>> {
        try {

            const mockOperations = [
                {
                    operationId: "OP-" + Math.floor(Math.random() * 1000),
                    type: "UNLOADING",
                    containerNumber: "CONT-1234",
                    resourceId: "CRANE-01",
                    startTime: new Date(dto.date),
                    endTime: new Date(new Date(dto.date).getTime() + 3600000)
                }
            ];

            const planOrError = OperationPlan.create({
                vvnId: dto.vvnId,
                vesselId: dto.vesselId,
                date: new Date(dto.date),
                operations: mockOperations,
                status: 'PLANNED'
            });

            if (planOrError.isFailure) return Result.fail<IOperationPlanDTO>(planOrError.errorValue());
            const planResult = planOrError.getValue();
            await this.planRepo.save(planResult);
            return Result.ok<IOperationPlanDTO>(OperationPlanMap.toDTO(planResult));
        } catch (e) { throw e; }
    }

    public async getOperationPlans(vesselId?: string, dateStr?: string): Promise<Result<IOperationPlanDTO[]>> {
        try {
            let dateFilter: Date | undefined = undefined;
            if (dateStr) {
                dateFilter = new Date(dateStr);
                if (isNaN(dateFilter.getTime())) return Result.fail<IOperationPlanDTO[]>("Invalid Date");
            }
            const plans = await this.planRepo.findByFilters(vesselId, dateFilter);
            return Result.ok<IOperationPlanDTO[]>(plans.map(p => OperationPlanMap.toDTO(p)));
        } catch (e) { throw e; }
    }

    public async getAll(): Promise<Result<IOperationPlanDTO[]>> {
        try {
            const plans = await this.planRepo.findAll();
            return Result.ok<IOperationPlanDTO[]>(plans.map(p => OperationPlanMap.toDTO(p)));
        } catch (e) { throw e; }
    }

    public async updateOperationPlan(dto: IUpdateOperationPlanDTO): Promise<Result<IOperationPlanDTO>> {
        try {
            const plan = await this.planRepo.findByDomainId(dto.id);
            if (plan === null) return Result.fail<IOperationPlanDTO>("Plan not found");

            if (dto.date) {
                const newDate = new Date(dto.date);
                if (isNaN(newDate.getTime())) return Result.fail<IOperationPlanDTO>("Invalid Date");
                plan.updateDate(newDate);
            }
            if (dto.vesselId) plan.updateVessel(dto.vesselId);
            if (dto.status) plan.updateStatus(dto.status);

            if (dto.operations) {
                const newOps = [];
                for (const op of dto.operations) {
                    if (!op.startTime || !op.endTime) return Result.fail<IOperationPlanDTO>("Dates missing");
                    const start = new Date(op.startTime);
                    const end = new Date(op.endTime);
                    if (isNaN(start.getTime()) || isNaN(end.getTime())) return Result.fail<IOperationPlanDTO>("Invalid Date Format");

                    newOps.push({
                        operationId: op.operationId,
                        type: op.type,
                        containerNumber: op.containerNumber || '',
                        resourceId: op.resourceId || '',
                        startTime: start,
                        endTime: end
                    });
                }
                plan.updateOperations(newOps);
            }

            await this.planRepo.save(plan);
            return Result.ok<IOperationPlanDTO>(OperationPlanMap.toDTO(plan));
        } catch (e) {
            console.error(e);
            return Result.fail<IOperationPlanDTO>(String(e));
        }
    }
}