import { Result } from "../../core/logic/Result";
import { ICreateComplementaryTaskDTO, IComplementaryTaskDTO } from "../../dto/IComplementaryTaskDTO";

export default interface IComplementaryTaskService {
    createTask(taskDTO: ICreateComplementaryTaskDTO): Promise<Result<IComplementaryTaskDTO>>;
}