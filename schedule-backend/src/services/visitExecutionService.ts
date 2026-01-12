import { Service, Inject } from 'typedi';
import { Result } from "../core/logic/Result";
import IVisitExecutionService from './IServices/IVisitExecutionService';
import { ICreateVisitExecutionDTO, IVisitExecutionDTO, IUpdateVisitExecutionDTO } from '../dto/IVisitExecutionDTO';
import IVisitExecutionRepo from '../services/IRepos/IVisitExecutionRepo';
import { VisitExecution } from '../domain/visitExecution';
import { VisitExecutionMap } from '../mappers/VisitExecutionMap';
import AuditLogRepo from '../repos/auditLogRepo';



@Service()
export default class VisitExecutionService implements IVisitExecutionService {
    constructor(
        @Inject('VisitExecutionRepo') private visitExecutionRepo: IVisitExecutionRepo,
         @Inject('AuditLogRepo') private auditLogRepo: AuditLogRepo
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

    public async getAll(): Promise<Result<IVisitExecutionDTO[]>> {
        try {
            const visits = await this.visitExecutionRepo.findAll();
            const visitsDTO = visits.map((visit) => VisitExecutionMap.toDTO(visit));
            return Result.ok<IVisitExecutionDTO[]>(visitsDTO);
        } catch (e) {
            return Result.fail<IVisitExecutionDTO[]>(e);
        }
    }

    public async updateVisitExecution(
  id: string,
  dto: IUpdateVisitExecutionDTO
): Promise<Result<IVisitExecutionDTO>> {
  try {
    const visit = await this.visitExecutionRepo.findByDomainId(id);

    console.log('proto has update:', typeof (VisitExecution as any).prototype.update);
    console.log('instance has update:', typeof (visit as any)?.update);
    console.log('ctor:', (visit as any)?.constructor?.name);

    if (!visit) {
      return Result.fail<IVisitExecutionDTO>('VisitExecution not found.');
    }

    const updateResult = visit.update({
      arrivalTime: dto.arrivalTime,
      status: dto.status
    });

    if (updateResult.isFailure) {
      return Result.fail<IVisitExecutionDTO>(updateResult.errorValue());
    }

    const savedVisit = await this.visitExecutionRepo.save(visit);

    await this.auditLogRepo.save({
      entityId: id,
      entityType: 'VisitExecution',
      action: 'UPDATE',
      operatorId: 'operador_logistico_01',
      timestamp: new Date(),
      details: {
        status: dto.status,
        arrivalTime: dto.arrivalTime
      }
    });

    const visitDTOResult = VisitExecutionMap.toDTO(savedVisit) as IVisitExecutionDTO;
    return Result.ok<IVisitExecutionDTO>(visitDTOResult);
  } catch (e) {
    throw e;
  }
}

}