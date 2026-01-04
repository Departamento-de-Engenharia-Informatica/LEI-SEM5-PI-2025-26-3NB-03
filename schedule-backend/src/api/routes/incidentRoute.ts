import { Router } from 'express';
import { Container } from 'typedi';
import IncidentController from '../../controllers/incidentController';

const route = Router();

export default (app: Router) => {
    app.use('/incidents', route);

    const ctrl = Container.get(IncidentController);

    // Criar
    route.post('', (req, res, next) => ctrl.create(req, res, next));

    // Listar (com filtros)
    route.get('', (req, res, next) => ctrl.list(req, res, next));

    // Atualizar (Resolver ou Editar)
    route.patch('/:id', (req, res, next) => ctrl.update(req, res, next));
};