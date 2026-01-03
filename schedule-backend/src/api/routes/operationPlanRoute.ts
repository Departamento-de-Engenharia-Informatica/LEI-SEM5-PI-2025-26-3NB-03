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
                algorithm: Joi.string().optional()
            }),
        }),
        (req, res, next) => ctrl.createOperationPlan(req, res, next)
    );

    route.get('', (req, res, next) => ctrl.getOperationPlans(req, res, next));

    route.patch('/:id',
        celebrate({
            body: Joi.object({
                domainId: Joi.string().optional(),
                id: Joi.string().optional(),
                date: Joi.string().optional(),
                vesselId: Joi.string().optional(),
                status: Joi.string().optional(),

                // VALIDACAO DA LISTA DE OPERACOES
                operations: Joi.array().items(
                    Joi.object({
                        operationId: Joi.string().optional(),
                        type: Joi.string().required(),
                        containerNumber: Joi.string().allow('').optional(),
                        resourceId: Joi.string().allow('').optional(),
                        startTime: Joi.string().required(),
                        endTime: Joi.string().required(),
                        _id: Joi.string().optional()
                    })
                        .unknown(true)
                ).optional()
            }).unknown(true),
        }),
        (req, res, next) => ctrl.updateOperationPlan(req, res, next)
    );
    route.delete('/:id', (req, res, next) => ctrl.deleteOperationPlan(req, res, next));
};