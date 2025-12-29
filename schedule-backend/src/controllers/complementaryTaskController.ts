import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import IComplementaryTaskController from './IControllers/IComplementaryTaskController';
import IComplementaryTaskService from '../services/IServices/IComplementaryTaskService';
import { ICreateComplementaryTaskDTO, IComplementaryTaskDTO } from '../dto/IComplementaryTaskDTO';
import { Result } from "../core/logic/Result";

@Service()
export default class ComplementaryTaskController implements IComplementaryTaskController {
    constructor(
        @Inject('ComplementaryTaskService') private taskService: IComplementaryTaskService
    ) {}

    public async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const taskOrError = await this.taskService.createTask(req.body as ICreateComplementaryTaskDTO);

            if (taskOrError.isFailure) {
                return res.status(400).send(taskOrError.errorValue());
            }

            const taskDTO = taskOrError.getValue();
            return res.status(201).json(taskDTO);
        } catch (e) {
            return next(e);
        }
    }
    public async getAllTasks(req: Request, res: Response, next: NextFunction) {
        try {

            const result = await this.taskService.getAllTasks();

            if (result.isFailure) {
                return res.status(400).send(result.errorValue());
            }
            return res.status(200).json(result.getValue());
        } catch (e) {
            return next(e);
        }
    }
}