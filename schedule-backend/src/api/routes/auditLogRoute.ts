import { Router } from 'express';
import { Container } from 'typedi';
import AuditLogController from '../../controllers/auditLogController';

const route = Router();

export default (app: Router) => {
  app.use('/audit-logs', route);

  const ctrl = Container.get(AuditLogController);

  route.get('', (req, res, next) => ctrl.getByEntityId(req, res, next));
};
