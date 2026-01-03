import mongoose from 'mongoose';
import { IOperationPlanPersistence } from '../../dataschema/IOperationPlanPersistence';

const OperationPlanSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        vvnId: { type: String, required: true },
        vesselId: { type: String, required: true },
        date: { type: Date, required: true },

        operations: [{
            operationId: String,
            type: { type: String, enum: ['LOADING', 'UNLOADING'] },
            containerNumber: String,
            resourceId: String,
            startTime: Date,
            endTime: Date
        }],

        status: { type: String, default: 'PLANNED' }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IOperationPlanPersistence & mongoose.Document>('OperationPlan', OperationPlanSchema);