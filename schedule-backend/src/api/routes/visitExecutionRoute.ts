import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';

const route = Router();

export default (app: Router) => {
    app.use('/visit-executions', route);

    const ctrl = Container.get('VisitExecutionController') as any;

    route.post('',
        celebrate({
            body: Joi.object({
                vvnId: Joi.string().required(),
                vesselId: Joi.string().required(),
                arrivalTime: Joi.string().required(),
                creatorId: Joi.string().required()
            }),
        }),
        (req, res, next) => ctrl.createVisitExecution(req, res, next)
    );
    route.get('', (req, res, next) => ctrl.getAll(req, res, next));
};