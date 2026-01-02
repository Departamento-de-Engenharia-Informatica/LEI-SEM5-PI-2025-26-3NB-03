import { Result } from "../../core/logic/Result";
import { ICreateVisitExecutionDTO, IVisitExecutionDTO } from "../../dto/IVisitExecutionDTO";

export default interface IVisitExecutionService {
    createVisitExecution(dto: ICreateVisitExecutionDTO): Promise<Result<IVisitExecutionDTO>>;
    getAll(): Promise<Result<IVisitExecutionDTO[]>>;
}