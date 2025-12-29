import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import IVisitExecutionController from './IControllers/IVisitExecutionController';
import IVisitExecutionService from '../services/IServices/IVisitExecutionService';
import { ICreateVisitExecutionDTO } from '../dto/IVisitExecutionDTO';

@Service()
export default class VisitExecutionController implements IVisitExecutionController {
    constructor(
        @Inject('VisitExecutionService') private visitExecutionService: IVisitExecutionService
    ) {}

    public async createVisitExecution(req: Request, res: Response, next: NextFunction) {
        try {
            const visitOrError = await this.visitExecutionService.createVisitExecution(req.body as ICreateVisitExecutionDTO);

            if (visitOrError.isFailure) {
                return res.status(400).send(visitOrError.errorValue());
            }

            const visitDTO = visitOrError.getValue();
            return res.status(201).json(visitDTO);
        } catch (e) {
            return next(e);
        }
    }
}