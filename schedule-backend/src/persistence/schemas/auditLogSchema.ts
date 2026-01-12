import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema(
  {
    entityId: { type: String, required: true },
    entityType: { type: String, required: true },
    action: { type: String, required: true },
    operatorId: { type: String, required: true },
    timestamp: { type: Date, required: true },
    details: { type: Object }
  },
  { timestamps: false }
);

export default mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);