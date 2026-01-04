import mongoose from 'mongoose';

const PrivacyPolicySchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        version: { type: String, required: true },
        content: { type: String, required: true },
        publishedDate: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export default mongoose.model('PrivacyPolicy', PrivacyPolicySchema);