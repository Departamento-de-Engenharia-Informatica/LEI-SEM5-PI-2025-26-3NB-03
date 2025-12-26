import mongoose from 'mongoose';
import { IComplementaryTaskPersistence } from '../../dataschema/IComplementaryTaskPersistence';

const ComplementaryTaskSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        name: { type: String, unique: true },
        description: { type: String, required: true },
        categoryId: { type: String, required: true },
        active: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IComplementaryTaskPersistence & mongoose.Document>('ComplementaryTask', ComplementaryTaskSchema);