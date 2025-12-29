import { Request, Response, NextFunction } from 'express';

export default interface IComplementaryTaskController {
    createTask(req: Request, res: Response, next: NextFunction);
}