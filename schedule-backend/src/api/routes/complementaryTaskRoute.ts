import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';

const route = Router();

export default (app: Router) => {
    app.use('/complementary-tasks', route);

    const ctrl = Container.get('ComplementaryTaskController') as any;

    route.post('',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required(),
                categoryId: Joi.string().required() // Obrigatório passar o ID da categoria
            }),
        }),
        (req, res, next) => ctrl.createTask(req, res, next)
    );
};