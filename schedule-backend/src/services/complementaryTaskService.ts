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
            // 1. Verificar se a Categoria existe (Integridade Referencial)
            const categoryExists = await this.categoryRepo.findByDomainId(taskDTO.categoryId);
            if (!categoryExists) {
                return Result.fail<IComplementaryTaskDTO>("Category not found. Cannot create task.");
            }

            // 2. Verificar se o Nome da Tarefa já existe (Unicidade)
            const taskExists = await this.taskRepo.findByName(taskDTO.name);
            if (taskExists) {
                return Result.fail<IComplementaryTaskDTO>("Task with this name already exists.");
            }

            // 3. Criar a Entidade de Domínio
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

            // 4. Guardar na Base de Dados
            await this.taskRepo.save(taskResult);

            const taskDTOResult = ComplementaryTaskMap.toDTO(taskResult) as IComplementaryTaskDTO;
            return Result.ok<IComplementaryTaskDTO>(taskDTOResult);
        } catch (e) {
            throw e;
        }
    }
}