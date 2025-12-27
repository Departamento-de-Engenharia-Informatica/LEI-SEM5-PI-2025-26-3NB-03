import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';

const route = Router();

export default (app: Router) => {
    app.use('/operation-plans', route);

    const ctrl = Container.get('OperationPlanController') as any;


    route.post('',
        celebrate({
            body: Joi.object({
                vvnId: Joi.string().required(),
                vesselId: Joi.string().required(),
                date: Joi.string().required(),
                operationType: Joi.string().required()
            }),
        }),
        (req, res, next) => ctrl.createOperationPlan(req, res, next)
    );


    route.get('',
        (req, res, next) => ctrl.getOperationPlans(req, res, next)
    );
};