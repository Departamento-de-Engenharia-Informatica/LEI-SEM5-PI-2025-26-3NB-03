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


    const dummyPlanProps = {
        vvnId: 'VVN-001',
        vesselId: 'IMO-123',
        date: '2024-12-30',
        operationType: 'LOADING'
    };

    beforeEach(() => {

        const dummyPlan = OperationPlan.create(dummyPlanProps).getValue();

        planRepoStub = {

            save: sinon.stub().resolves(dummyPlan),


            findByFilters: sinon.stub().resolves([dummyPlan])
        };

        service = new OperationPlanService(
            planRepoStub as IOperationPlanRepo
        );
    });

    it('deve criar um Plano de Operação com sucesso', async () => {
        const result = await service.createOperationPlan(dummyPlanProps);

        expect(result.isSuccess).to.be.true;
        expect(result.getValue().vvnId).to.equal('VVN-001');
    });

    it('deve listar planos usando filtros (Navio e Data)', async () => {
        const vesselId = 'IMO-123';
        const dateStr = '2024-12-30';

        const result = await service.getOperationPlans(vesselId, dateStr);

        expect(result.isSuccess).to.be.true;

        sinon.assert.calledWith(planRepoStub.findByFilters as sinon.SinonStub, vesselId, sinon.match.any);
        expect(result.getValue()).to.be.an('array');
        expect(result.getValue()[0].vesselId).to.equal('IMO-123');
    });

    it('deve falhar se a data do filtro for inválida', async () => {
        const result = await service.getOperationPlans('IMO-123', 'data-invalida');

        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal("Invalid Date format.");
    });
});