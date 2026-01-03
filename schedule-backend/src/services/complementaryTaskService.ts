import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import IComplementaryTaskService from './IServices/IComplementaryTaskService';
import { ICreateComplementaryTaskDTO, IComplementaryTaskDTO } from '../dto/IComplementaryTaskDTO';
import IComplementaryTaskRepo from '../services/IRepos/IComplementaryTaskRepo';
import IComplementaryTaskCategoryRepo from '../services/IRepos/IComplementaryTaskCategoryRepo';
import { ComplementaryTask } from '../domain/complementaryTask';
import { ComplementaryTaskMap } from '../mappers/ComplementaryTaskMap';

@Service()
export default class ComplementaryTaskService implements IComplementaryTaskService {
    constructor(
        @Inject('ComplementaryTaskRepo') private taskRepo: IComplementaryTaskRepo,
        @Inject('ComplementaryTaskCategoryRepo') private categoryRepo: IComplementaryTaskCategoryRepo // <--- Injeção do Repo de Categorias
    ) {}

    public async createTask(taskDTO: ICreateComplementaryTaskDTO): Promise<Result<IComplementaryTaskDTO>> {
        try {

            const categoryExists = await this.categoryRepo.findByDomainId(taskDTO.categoryId);
            if (!categoryExists) {
                return Result.fail<IComplementaryTaskDTO>("Category not found. Cannot create task.");
            }


            const taskExists = await this.taskRepo.findByName(taskDTO.name);
            if (taskExists) {
                return Result.fail<IComplementaryTaskDTO>("Task with this name already exists.");
            }


            const taskOrError = ComplementaryTask.create({
                name: taskDTO.name,
                description: taskDTO.description,
                categoryId: taskDTO.categoryId,
                active: true
            });

            if (taskOrError.isFailure) {
                return Result.fail<IComplementaryTaskDTO>(taskOrError.errorValue());
            }

            const taskResult = taskOrError.getValue();


            await this.taskRepo.save(taskResult);

            const taskDTOResult = ComplementaryTaskMap.toDTO(taskResult) as IComplementaryTaskDTO;
            return Result.ok<IComplementaryTaskDTO>(taskDTOResult);
        } catch (e) {
            throw e;
        }
    }
    public async getAllTasks(): Promise<Result<IComplementaryTaskDTO[]>> {
        try {

            const tasks = await this.taskRepo.findAll();


            if (tasks === null) {
                return Result.fail<IComplementaryTaskDTO[]>("Nenhuma tarefa encontrada.");
            }


            const tasksDTO = tasks.map((task) => ComplementaryTaskMap.toDTO(task)) as IComplementaryTaskDTO[];


            return Result.ok<IComplementaryTaskDTO[]>(tasksDTO);
        } catch (e) {
            return Result.fail<IComplementaryTaskDTO[]>(e);
        }
    }
}