import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import IVisitExecutionController from './IControllers/IVisitExecutionController';
import IVisitExecutionService from '../services/IServices/IVisitExecutionService';
import { ICreateVisitExecutionDTO } from '../dto/IVisitExecutionDTO';
import { IUpdateVisitExecutionDTO } from '../dto/IVisitExecutionDTO';


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

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.visitExecutionService.getAll();
            if (result.isFailure) {
                return res.status(400).json(result.errorValue());
            }
            return res.status(200).json(result.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async updateVisitExecution(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('>>> HIT updateVisitExecution controller', req.method, req.originalUrl);
      const id = req.params.id;

      const updateOrError = await this.visitExecutionService.updateVisitExecution(
        id,
        req.body as IUpdateVisitExecutionDTO
      );

      if (updateOrError.isFailure) {
        return res.status(400).send(updateOrError.errorValue());
      }

      return res.status(200).json(updateOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }
}