import { Request, Response, NextFunction } from 'express';

export default interface IVisitExecutionController {
    createVisitExecution(req: Request, res: Response, next: NextFunction);
}