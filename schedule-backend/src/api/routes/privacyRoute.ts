import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default (app: Router) => {
    app.use('/privacy', route);


    const ctrl = Container.get('PrivacyController') as any;


    route.get('/policy', (req, res, next) => ctrl.getLatestPolicy(req, res, next));


    route.post('/policy', (req, res, next) => ctrl.createPolicy(req, res, next));


    route.get('/export/:userId', (req, res, next) => ctrl.exportUserData(req, res, next));


    route.delete('/account/:userId', (req, res, next) => ctrl.deleteAccount(req, res, next));
};