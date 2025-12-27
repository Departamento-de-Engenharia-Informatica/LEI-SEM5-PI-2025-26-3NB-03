import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from "../../../config";
import IComplementaryTaskCategoryController from '../../controllers/IControllers/IComplementaryTaskCategoryController';

const route = Router();

export default (app: Router) => {
    app.use('/complementary-task-categories', route);

    const ctrl = Container.get(config.controllers.complementaryTaskCategory.name) as IComplementaryTaskCategoryController;

    route.post('',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.createCategory(req, res, next)
    );

    route.get('', (req, res, next) => ctrl.listCategories(req, res, next));
};