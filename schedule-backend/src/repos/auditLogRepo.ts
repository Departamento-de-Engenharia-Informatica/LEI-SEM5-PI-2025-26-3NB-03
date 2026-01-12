import { Inject, Service } from 'typedi';
import { Model, Document } from 'mongoose';

@Service()
export default class AuditLogRepo {
  constructor(
    @Inject('auditLogSchema')
    private auditLogSchema: Model<Document>
  ) {}

  async save(log: any): Promise<void> {
    await this.auditLogSchema.create(log);
  }

  public async findByEntityId(entityId: string): Promise<any[]> {
  return this.auditLogSchema
    .find({ entityId })
    .sort({ timestamp: -1 })
    .lean();
}
}

