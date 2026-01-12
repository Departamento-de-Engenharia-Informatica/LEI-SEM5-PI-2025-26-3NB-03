import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class AuditLogController {
  constructor(@Inject('AuditLogService') private auditLogService: any) {}

  public async getByEntityId(req: Request, res: Response, next: NextFunction) {
    try {
      const entityId = req.query.entityId as string;
      if (!entityId) return res.status(400).json({ message: 'entityId is required' });

      const logs = await this.auditLogService.getByEntityId(entityId);
      return res.status(200).json(logs);
    } catch (e) {
      return next(e);
    }
  }
}
