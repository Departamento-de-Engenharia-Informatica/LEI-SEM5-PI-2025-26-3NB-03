import { Service, Inject } from 'typedi';
import { Result } from "../core/logic/Result";
import IVisitExecutionService from './IServices/IVisitExecutionService';
import { ICreateVisitExecutionDTO, IVisitExecutionDTO } from '../dto/IVisitExecutionDTO';
import IVisitExecutionRepo from '../services/IRepos/IVisitExecutionRepo';
import { VisitExecution } from '../domain/visitExecution';
import { VisitExecutionMap } from '../mappers/VisitExecutionMap';

@Service()
export default class VisitExecutionService implements IVisitExecutionService {
    constructor(
        @Inject('VisitExecutionRepo') private visitExecutionRepo: IVisitExecutionRepo
    ) {}

    public async createVisitExecution(dto: ICreateVisitExecutionDTO): Promise<Result<IVisitExecutionDTO>> {
        try {

            const visitOrError = VisitExecution.create({
                vvnId: dto.vvnId,
                vesselId: dto.vesselId,
                arrivalTime: dto.arrivalTime,
                creatorId: dto.creatorId
            });

            if (visitOrError.isFailure) {
                return Result.fail<IVisitExecutionDTO>(visitOrError.errorValue());
            }

            const visitResult = visitOrError.getValue();


            await this.visitExecutionRepo.save(visitResult);


            const visitDTOResult = VisitExecutionMap.toDTO(visitResult) as IVisitExecutionDTO;
            return Result.ok<IVisitExecutionDTO>(visitDTOResult);
        } catch (e) {
            throw e;
        }
    }
}