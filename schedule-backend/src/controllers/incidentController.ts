import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import IncidentService from '../services/incidentService';
import { IIncidentDTO } from '../dto/IIncidentDTO';
import { Result } from "../core/logic/Result";

@Service()
export default class IncidentController {
    constructor(

        @Inject('IncidentService') private incidentService: IncidentService
    ) {}

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.incidentService.createIncident(req.body);

            if (result.isFailure) {
                return res.status(400).json({ message: result.errorValue() });
            }
            return res.status(201).json(result.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async list(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.incidentService.getIncidents(req.query);
            return res.status(200).json(result.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = { ...req.body, id: req.params.id };
            const result = await this.incidentService.updateIncident(dto);

            if (result.isFailure) {
                return res.status(404).json({ message: result.errorValue() });
            }
            return res.status(200).json(result.getValue());
        } catch (e) {
            return next(e);
        }
    }
}