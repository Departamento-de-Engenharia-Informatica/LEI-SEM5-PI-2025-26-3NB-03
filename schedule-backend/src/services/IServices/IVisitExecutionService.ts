import { Result } from "../../core/logic/Result";
import { ICreateVisitExecutionDTO, IVisitExecutionDTO, IUpdateVisitExecutionDTO, IUpdateBerthDockDTO } from "../../dto/IVisitExecutionDTO";

export default interface IVisitExecutionService {
    createVisitExecution(dto: ICreateVisitExecutionDTO): Promise<Result<IVisitExecutionDTO>>;
    getAll(): Promise<Result<IVisitExecutionDTO[]>>;
    updateVisitExecution(id: string, dto: IUpdateVisitExecutionDTO): Promise<Result<IVisitExecutionDTO>>;
    updateBerthAndDock(
        id: string,
        dto: IUpdateBerthDockDTO
    ): Promise<Result<IVisitExecutionDTO>>;
}
