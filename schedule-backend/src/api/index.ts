import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import complementaryTaskCategory from './routes/complementaryTaskCategoryRoute';
import complementaryTaskRoute from './routes/complementaryTaskRoute';
import visitExecutionRoute from './routes/visitExecutionRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
    complementaryTaskCategory(app);
    complementaryTaskRoute(app);
    visitExecutionRoute(app);
	return app
}