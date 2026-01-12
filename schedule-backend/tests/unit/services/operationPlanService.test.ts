import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Result } from '../../../src/core/logic/Result';
import OperationPlanService from '../../../src/services/operationPlanService';
import IOperationPlanRepo from '../../../src/services/IRepos/IOperationPlanRepo';
import { OperationPlan } from '../../../src/domain/operationPlan';

describe('OperationPlan Service', () => {
    let service: OperationPlanService;
    let planRepoStub: Partial<IOperationPlanRepo>;


    const dateString = new Date().toISOString();
    const dateObj = new Date(dateString);


    const createDto = {
        vvnId: 'vvn-123',
        vesselId: 'vessel-123',
        date: dateString,
        operationType: 'LOADING'
    };


    const domainProps = {
        vvnId: 'vvn-123',
        vesselId: 'vessel-123',
        date: dateObj,
        operationType: 'LOADING',
        status: 'PLANNED',
        operations: []
    };

    beforeEach(() => {

        const dummyPlan = OperationPlan.create(domainProps).getValue();

        planRepoStub = {
            save: sinon.stub().resolves(dummyPlan),
            findByFilters: sinon.stub().resolves([dummyPlan]),
            findByDomainId: sinon.stub().resolves(dummyPlan)
        };

        service = new OperationPlanService(
            planRepoStub as IOperationPlanRepo
        );
    });

    it('deve criar um Plano de Operação com sucesso', async () => {

        const result = await service.createOperationPlan(createDto);

        expect(result.isSuccess).to.be.true;

        expect(result.getValue().vvnId).to.equal(createDto.vvnId);
    });

    it('deve listar planos usando filtros (Navio e Data)', async () => {
        const vesselId = 'vessel-123';
        const dateStr = '2024-12-30';

        const result = await service.getOperationPlans(vesselId, dateStr);

        expect(result.isSuccess).to.be.true;

        sinon.assert.calledWith(planRepoStub.findByFilters as sinon.SinonStub, vesselId, sinon.match.any);
        expect(result.getValue()).to.be.an('array');

        expect(result.getValue()[0].vesselId).to.equal(domainProps.vesselId);
    });

    it('deve falhar se a data do filtro for inválida', async () => {
        const result = await service.getOperationPlans('IMO-123', 'data-invalida');

        expect(result.isFailure).to.be.true;
        expect(result.error).to.contain("Invalid Date");
    });

    it('deve atualizar um plano existente', async () => {

        (planRepoStub.findByDomainId as sinon.SinonStub).resolves(OperationPlan.create(domainProps).getValue());

        const updateDTO = {
            id: '123',
            status: 'COMPLETED'
        };

        const result = await service.updateOperationPlan(updateDTO);

        expect(result.isSuccess).to.be.true;
        expect(result.getValue().status).to.equal('COMPLETED');
    });
});