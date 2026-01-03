import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import IOperationPlanController from './IControllers/IOperationPlanController';
import IOperationPlanService from '../services/IServices/IOperationPlanService';
import { IUpdateOperationPlanDTO } from "../dto/IOperationPlanDTO";

@Service()
export default class OperationPlanController implements IOperationPlanController {
    constructor(
        @Inject('OperationPlanService') private planService: IOperationPlanService
    ) {}

    public async createOperationPlan(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.planService.createOperationPlan(req.body);
            if (result.isFailure) return res.status(400).send(result.errorValue());
            return res.status(201).json(result.getValue());
        } catch (e) { return next(e); }
    }

    public async getOperationPlans(req: Request, res: Response, next: NextFunction) {
        try {
            const vesselId = req.query.vesselId as string;
            const date = req.query.date as string;

            const result = (!vesselId && !date)
                ? await this.planService.getAll()
                : await this.planService.getOperationPlans(vesselId, date);

            if (result.isFailure) return res.status(400).send(result.errorValue());
            return res.status(200).json(result.getValue());
        } catch (e) { return next(e); }
    }

    public async updateOperationPlan(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IUpdateOperationPlanDTO;
            dto.id = req.params.id;
            const result = await this.planService.updateOperationPlan(dto);
            if (result.isFailure) return res.status(404).send(result.errorValue());
            return res.status(200).json(result.getValue());
        } catch (e) { return next(e); }
    }

    public async deleteOperationPlan(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.planService.deleteOperationPlan(id);

            if (result.isFailure) {
                return res.status(404).json({ message: result.errorValue() });
            }

            return res.status(200).json({ message: "Deleted successfully" });
        } catch (e) {
            return next(e);
        }
    }
}