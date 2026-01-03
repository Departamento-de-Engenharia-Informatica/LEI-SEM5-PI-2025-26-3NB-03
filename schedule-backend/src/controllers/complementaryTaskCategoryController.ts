import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import IComplementaryTaskCategoryService from '../services/IServices/IComplementaryTaskCategoryService';
import IComplementaryTaskCategoryController from './IControllers/IComplementaryTaskCategoryController';
import { ICreateComplementaryTaskCategoryDTO } from '../dto/IComplementaryTaskCategoryDTO';

@Service()
export default class ComplementaryTaskCategoryController implements IComplementaryTaskCategoryController {
    constructor(
        @Inject(config.services.complementaryTaskCategory.name) private categoryServiceInstance : IComplementaryTaskCategoryService
    ) {}

    public async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryOrError = await this.categoryServiceInstance.createCategory(req.body as ICreateComplementaryTaskCategoryDTO);

            if (categoryOrError.isFailure) {
                return res.status(400).send(categoryOrError.errorValue());
            }

            const categoryDTO = categoryOrError.getValue();
            return res.status(201).json(categoryDTO);
        } catch (e) {
            return next(e);
        }
    };

    public async listCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.categoryServiceInstance.getAllCategories();
            if(result.isFailure) {
                return res.status(400).send(result.errorValue());
            }
            return res.status(200).json(result.getValue());
        } catch(e) {
            return next(e);
        }
    }
}