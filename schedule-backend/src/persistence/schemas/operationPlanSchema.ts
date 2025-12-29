import mongoose from 'mongoose';
import { IOperationPlanPersistence } from '../../dataschema/IOperationPlanPersistence';

const OperationPlanSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        vvnId: { type: String, required: true },
        vesselId: { type: String, required: true },
        date: { type: Date, required: true },
        operationType: { type: String, required: true },
        status: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IOperationPlanPersistence & mongoose.Document>('OperationPlan', OperationPlanSchema);