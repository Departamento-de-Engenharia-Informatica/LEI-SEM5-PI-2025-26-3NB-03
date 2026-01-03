import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Result } from '../../../src/core/logic/Result';
import ComplementaryTaskCategoryService from '../../../src/services/complementaryTaskCategoryService';
import IComplementaryTaskCategoryRepo from '../../../src/services/IRepos/IComplementaryTaskCategoryRepo';
import { ComplementaryTaskCategory } from '../../../src/domain/complementaryTaskCategory';

describe('ComplementaryTaskCategory Service', () => {
    let service: ComplementaryTaskCategoryService;
    let repoStub: Partial<IComplementaryTaskCategoryRepo>;

    beforeEach(() => {

        repoStub = {
            save: sinon.stub().resolves({
                id: '123',
                name: 'Limpeza',
                description: 'Limpeza Geral',
                isActive: true
            }),
            findByName: sinon.stub().resolves(null)
        };

        service = new ComplementaryTaskCategoryService(repoStub as IComplementaryTaskCategoryRepo);
    });

    it('deve criar uma categoria com sucesso', async () => {
        const dto = { name: 'Limpeza', description: 'Limpeza Geral' };


        const result = await service.createCategory(dto);


        expect(result.isSuccess).to.be.true;
        expect(result.getValue().name).to.equal(dto.name);
    });

    it('deve falhar se o nome já existir', async () => {
        const dto = { name: 'Limpeza', description: 'Limpeza Geral' };


        (repoStub.findByName as sinon.SinonStub).resolves(ComplementaryTaskCategory.create(dto).getValue());


        const result = await service.createCategory(dto);


        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal("Category with this name already exists.");
    });
});