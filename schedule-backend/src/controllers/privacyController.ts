import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import PrivacyService from '../services/privacyService';


@Service('PrivacyController')
export default class PrivacyController {
    constructor(
        @Inject('PrivacyService') private privacyService: PrivacyService
    ) {}


    public async createPolicy(req: Request, res: Response, next: NextFunction) {
        try {
            const { version, content } = req.body;

            if (!version || !content) {
                return res.status(400).json({ message: "Version and Content are required." });
            }

            const result = await this.privacyService.createPolicy(version, content);

            if (result.isFailure) {
                return res.status(400).json({ message: result.errorValue() });
            }

            return res.status(201).json(result.getValue());
        } catch (e) {
            return next(e);
        }
    }


    public async getLatestPolicy(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.privacyService.getLatestPolicy();

            if (result.isFailure) {
                return res.status(404).json({ message: "No privacy policy found." });
            }

            return res.status(200).json(result.getValue());
        } catch (e) {
            return next(e);
        }
    }


    public async exportUserData(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId; // Vem da rota /export/:userId
            const result = await this.privacyService.exportUserData(userId);

            if (result.isFailure) {
                return res.status(404).json({ message: result.errorValue() });
            }


            return res.status(200).json(result.getValue());
        } catch (e) {
            return next(e);
        }
    }


    public async deleteAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const result = await this.privacyService.deleteAccount(userId);

            if (result.isFailure) {
                return res.status(404).json({ message: result.errorValue() });
            }

            return res.status(200).json({ message: "Account deleted/anonymized successfully." });
        } catch (e) {
            return next(e);
        }
    }
}