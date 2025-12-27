import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Result } from '../../../src/core/logic/Result';
import ComplementaryTaskService from '../../../src/services/complementaryTaskService';
import IComplementaryTaskRepo from '../../../src/services/IRepos/IComplementaryTaskRepo';
import IComplementaryTaskCategoryRepo from '../../../src/services/IRepos/IComplementaryTaskCategoryRepo';
import { ComplementaryTask } from '../../../src/domain/complementaryTask';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';

describe('ComplementaryTask Service', () => {
    let service: ComplementaryTaskService;
    let taskRepoStub: Partial<IComplementaryTaskRepo>;
    let categoryRepoStub: Partial<IComplementaryTaskCategoryRepo>;

    beforeEach(() => {

        taskRepoStub = {
            save: sinon.stub().resolves({
                id: new UniqueEntityID('123'),
                name: 'Varrer',
                description: 'Varrer chão',
                categoryId: 'cat123',
                isActive: true
            }),
            findByName: sinon.stub().resolves(null) // Por defeito, não existe duplicado
        };


        categoryRepoStub = {
            findByDomainId: sinon.stub().resolves({
                id: new UniqueEntityID('cat123'),
                name: 'Limpeza'
            } as any)
        };


        service = new ComplementaryTaskService(
            taskRepoStub as IComplementaryTaskRepo,
            categoryRepoStub as IComplementaryTaskCategoryRepo
        );
    });

    it('deve criar uma tarefa com sucesso (Categoria existe + Nome único)', async () => {
        const dto = { name: 'Varrer', description: 'Varrer chão', categoryId: 'cat123' };

        const result = await service.createTask(dto);

        expect(result.isSuccess).to.be.true;
        expect(result.getValue().name).to.equal(dto.name);
    });

    it('deve falhar se a Categoria não existir', async () => {
        const dto = { name: 'Varrer', description: 'Varrer chão', categoryId: 'cat_inexistente' };

        // Simula que a categoria NÃO foi encontrada (retorna null)
        (categoryRepoStub.findByDomainId as sinon.SinonStub).resolves(null);

        const result = await service.createTask(dto);

        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal("Category not found. Cannot create task.");
    });

    it('deve falhar se o nome da Tarefa já existir', async () => {
        const dto = { name: 'Varrer', description: 'Varrer chão', categoryId: 'cat123' };


        (taskRepoStub.findByName as sinon.SinonStub).resolves(ComplementaryTask.create(dto).getValue());

        const result = await service.createTask(dto);

        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal("Task with this name already exists.");
    });
});