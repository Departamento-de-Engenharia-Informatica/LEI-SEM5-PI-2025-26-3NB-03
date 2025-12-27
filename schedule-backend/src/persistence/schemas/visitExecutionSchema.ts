import mongoose from 'mongoose';
import { IVisitExecutionPersistence } from '../../dataschema/IVisitExecutionPersistence';

const VisitExecutionSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        vvnId: { type: String, required: true }, // Referência ao VVN
        vesselId: { type: String, required: true },
        arrivalTime: { type: Date, required: true },
        status: { type: String, required: true },
        creatorId: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IVisitExecutionPersistence & mongoose.Document>('VisitExecution', VisitExecutionSchema);