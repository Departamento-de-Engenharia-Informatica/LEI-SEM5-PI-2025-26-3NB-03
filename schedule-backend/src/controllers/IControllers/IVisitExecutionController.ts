import { Request, Response, NextFunction } from 'express';

export default interface IVisitExecutionController {
    createVisitExecution(req: Request, res: Response, next: NextFunction);
    getAll(req: Request, res: Response, next: NextFunction);
    updateVisitExecution(req: Request, res: Response, next: NextFunction);
}