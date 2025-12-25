import mongoose from 'mongoose';
import { IComplementaryTaskCategoryPersistence } from '../../dataschema/IComplementaryTaskCategoryPersistence';

const ComplementaryTaskCategorySchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        name: { type: String, required: true, index: true },
        description: { type: String, required: true },
        active: { type: Boolean, default: true }
    },
    { timestamps: true }
);

export default mongoose.model<IComplementaryTaskCategoryPersistence & mongoose.Document>('ComplementaryTaskCategory', ComplementaryTaskCategorySchema);