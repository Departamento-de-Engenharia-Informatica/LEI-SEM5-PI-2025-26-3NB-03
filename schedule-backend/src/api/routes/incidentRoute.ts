import { Router } from 'express';
import { Container } from 'typedi';
import IncidentController from '../../controllers/incidentController';

const route = Router();

export default (app: Router) => {
    app.use('/incidents', route);

    const ctrl = Container.get(IncidentController);


    route.post('', (req, res, next) => ctrl.create(req, res, next));


    route.get('', (req, res, next) => ctrl.list(req, res, next));


    route.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
};