import { Request, Response, NextFunction } from 'express';

export default interface IComplementaryTaskCategoryController {
    createCategory(req: Request, res: Response, next: NextFunction);
    listCategories(req: Request, res: Response, next: NextFunction);
}