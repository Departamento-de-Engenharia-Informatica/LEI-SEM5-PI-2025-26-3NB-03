import { Service, Inject } from 'typedi';
import AuditLogRepo from '../repos/auditLogRepo';

@Service()
export default class AuditLogService {
  constructor(@Inject('AuditLogRepo') private auditLogRepo: AuditLogRepo) {}

  public async getByEntityId(entityId: string) {
    return this.auditLogRepo.findByEntityId(entityId);
  }
}
