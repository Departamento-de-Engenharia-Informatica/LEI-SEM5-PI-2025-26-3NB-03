import { Request, Response, NextFunction } from 'express';

export default interface IOperationPlanController {
    createOperationPlan(req: Request, res: Response, next: NextFunction);
    getOperationPlans(req: Request, res: Response, next: NextFunction);
    updateOperationPlan(req: Request, res: Response, next: NextFunction);
}