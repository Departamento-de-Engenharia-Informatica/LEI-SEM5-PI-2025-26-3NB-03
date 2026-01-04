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
                dockId: Joi.string().required(),
                arrivalTime: Joi.string().required(),
                creatorId: Joi.string().required()
            }),
        }),
        (req, res, next) => ctrl.createVisitExecution(req, res, next)
    );
    route.get('', (req, res, next) => ctrl.getAll(req, res, next));
    route.patch('/:id', (req, res, next) => ctrl.updateVisitExecution(req, res, next));
    route.patch('/:id/berth-dock',
        celebrate({
            body: Joi.object({
            arrivalTime: Joi.string().optional(),
            dockId: Joi.string().optional()
            }).min(1)
        }),
        (req, res, next) => ctrl.updateBerthAndDock(req, res, next)
    );
};
