import mongoose from 'mongoose';

const IncidentSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        incidentType: { type: String, required: true },
        severity: { type: String, enum: ['MINOR', 'MAJOR', 'CRITICAL'], required: true },
        status: { type: String, enum: ['ACTIVE', 'RESOLVED'], default: 'ACTIVE' },
        startTime: { type: Date, required: true },
        endTime: { type: Date },
        durationMinutes: { type: Number },
        affectedVVEs: [{ type: String }], // Array de IDs
        createdBy: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model('Incident', IncidentSchema);