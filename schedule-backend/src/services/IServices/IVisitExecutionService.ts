import { Result } from "../../core/logic/Result";
import { ICreateVisitExecutionDTO, IVisitExecutionDTO, IUpdateVisitExecutionDTO } from "../../dto/IVisitExecutionDTO";

export default interface IVisitExecutionService {
    createVisitExecution(dto: ICreateVisitExecutionDTO): Promise<Result<IVisitExecutionDTO>>;
    getAll(): Promise<Result<IVisitExecutionDTO[]>>;
    updateVisitExecution(id: string, dto: IUpdateVisitExecutionDTO): Promise<Result<IVisitExecutionDTO>>;
}