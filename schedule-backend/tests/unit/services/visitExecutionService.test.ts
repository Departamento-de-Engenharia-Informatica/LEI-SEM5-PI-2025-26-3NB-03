import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Result } from '../../../src/core/logic/Result';
import VisitExecutionService from '../../../src/services/visitExecutionService';
import IVisitExecutionRepo from '../../../src/services/IRepos/IVisitExecutionRepo';
import { VisitExecution } from '../../../src/domain/visitExecution';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';

describe('VisitExecution Service', () => {
    let service: VisitExecutionService;
    let visitExecutionRepoStub: Partial<IVisitExecutionRepo>;
    let auditLogRepoStub: any;

    beforeEach(() => {

        visitExecutionRepoStub = {
            save: sinon.stub().callsFake(async (visit) => {
                return visit;
            })
        };


        auditLogRepoStub = {
            save: sinon.stub().resolves()
        };


        service = new VisitExecutionService(
            visitExecutionRepoStub as IVisitExecutionRepo,
            auditLogRepoStub as any
        );
    });

    it('deve criar uma Execução de Visita com sucesso e estado IN_PROGRESS', async () => {
        const dto = {
            vvnId: 'VVN-2024-001',
            vesselId: 'IMO1234567',
            arrivalTime: new Date().toISOString(),
            creatorId: 'user123',
            dockId: 'DOCK-01'
        };

        const result = await service.createVisitExecution(dto);

        expect(result.isSuccess).to.be.true;
        expect(result.getValue().vvnId).to.equal(dto.vvnId);
        expect(result.getValue().status).to.equal("IN_PROGRESS");
    });

    it('deve falhar se os dados forem inválidos (ex: vvnId vazio)', async () => {
        const dto = {
            vvnId: '',
            vesselId: 'IMO1234567',
            arrivalTime: new Date().toISOString(),
            creatorId: 'user123',
            dockId: 'DOCK-01'
        };

        const result = await service.createVisitExecution(dto);

        expect(result.isFailure).to.be.true;
    });

});