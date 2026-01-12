export class AuditLog {
  constructor(
    public readonly entityId: string,
    public readonly entityType: string,
    public readonly action: string,
    public readonly operatorId: string,
    public readonly timestamp: Date,
    public readonly details?: any
  ) {}
}
