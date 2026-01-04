import { Service, Inject } from 'typedi';
import { Result } from "../core/logic/Result";
import { v4 as uuidv4 } from 'uuid';
import { IIncidentDTO, ICreateIncidentDTO, IUpdateIncidentDTO } from '../dto/IIncidentDTO';
import config from "../../config";

@Service('IncidentService')
export default class IncidentService {
    constructor(
        @Inject('incidentSchema') private incidentSchema: any
    ) {}


    public async createIncident(dto: ICreateIncidentDTO): Promise<Result<IIncidentDTO>> {
        try {
            const incident = await this.incidentSchema.create({
                ...dto,
                domainId: uuidv4(),
                status: 'ACTIVE'
            });
            return Result.ok<IIncidentDTO>(incident);
        } catch (e) { return Result.fail<IIncidentDTO>(e); }
    }

    public async getIncidents(filters: any): Promise<Result<IIncidentDTO[]>> {
        const query: any = {};
        if (filters.status) query.status = filters.status;
        if (filters.severity) query.severity = filters.severity;
        if (filters.vveId) query.affectedVVEs = { $in: [filters.vveId] };

        const incidents = await this.incidentSchema.find(query).sort({ startTime: -1 });
        return Result.ok<IIncidentDTO[]>(incidents);
    }

    public async updateIncident(dto: IUpdateIncidentDTO): Promise<Result<IIncidentDTO>> {
        try {
            const incident = await this.incidentSchema.findOne({ domainId: dto.id });
            if (!incident) return Result.fail("Incident not found");

            if (dto.description) incident.description = dto.description;
            if (dto.severity) incident.severity = dto.severity;

            if (dto.status === 'RESOLVED' && dto.endTime) {
                incident.status = 'RESOLVED';
                incident.endTime = new Date(dto.endTime);
                const start = new Date(incident.startTime).getTime();
                const end = incident.endTime.getTime();
                incident.durationMinutes = Math.floor((end - start) / 60000);
            }

            await incident.save();
            return Result.ok<IIncidentDTO>(incident);
        } catch (e) { return Result.fail(e); }
    }
}