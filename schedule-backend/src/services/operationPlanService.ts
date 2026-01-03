import { Service, Inject } from 'typedi';
import { Result } from "../core/logic/Result";
import IOperationPlanService from './IServices/IOperationPlanService';
import {IOperationPlanDTO, IUpdateOperationPlanDTO} from '../dto/IOperationPlanDTO';
import IOperationPlanRepo from '../services/IRepos/IOperationPlanRepo';
import { OperationPlan } from '../domain/operationPlan';
import { OperationPlanMap } from '../mappers/OperationPlanMap';

@Service()
export default class OperationPlanService implements IOperationPlanService {
    constructor(
        @Inject('OperationPlanRepo') private planRepo: IOperationPlanRepo
    ) {}


    public async createOperationPlan(dto: any): Promise<Result<IOperationPlanDTO>> {
        try {
            const planOrError = OperationPlan.create(dto);
            if (planOrError.isFailure) return Result.fail<IOperationPlanDTO>(planOrError.errorValue());

            const planResult = planOrError.getValue();
            await this.planRepo.save(planResult);
            return Result.ok<IOperationPlanDTO>(OperationPlanMap.toDTO(planResult));
        } catch (e) {
            throw e;
        }
    }


    public async getOperationPlans(vesselId?: string, dateStr?: string): Promise<Result<IOperationPlanDTO[]>> {
        try {
            let dateFilter: Date | undefined = undefined;

            if (dateStr) {
                dateFilter = new Date(dateStr);
                if (isNaN(dateFilter.getTime())) {
                    return Result.fail<IOperationPlanDTO[]>("Invalid Date format.");
                }
            }

            const plans = await this.planRepo.findByFilters(vesselId, dateFilter);

            const plansDTO = plans.map(plan => OperationPlanMap.toDTO(plan));
            return Result.ok<IOperationPlanDTO[]>(plansDTO);
        } catch (e) {
            throw e;
        }
    }

    public async updateOperationPlan(dto: IUpdateOperationPlanDTO): Promise<Result<IOperationPlanDTO>> {
        try {

            const plan = await this.planRepo.findByDomainId(dto.id);

            if (plan === null) {
                return Result.fail<IOperationPlanDTO>("Plan not found");
            }


            if (dto.date) {
                const newDate = new Date(dto.date);
                if (isNaN(newDate.getTime())) {
                    return Result.fail<IOperationPlanDTO>("Invalid Date format.");
                }
                plan.updateDate(newDate);
            }

            if (dto.vesselId) {
                plan.updateVessel(dto.vesselId);
            }

            if (dto.status) {
                plan.updateStatus(dto.status);
            }


            await this.planRepo.save(plan);


            const planDTO = OperationPlanMap.toDTO(plan);
            return Result.ok<IOperationPlanDTO>(planDTO);
        } catch (e) {
            throw e;
        }
    }
}