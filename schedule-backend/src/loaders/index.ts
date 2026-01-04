import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    // --- SCHEMAS ---
    const userSchema = {
        name: 'userSchema',
        schema: '../persistence/schemas/userSchema',
    };

    const roleSchema = {
        name: 'roleSchema',
        schema: '../persistence/schemas/roleSchema',
    };

    const complementaryTaskCategorySchema = {
        name: 'complementaryTaskCategorySchema',
        schema: '../persistence/schemas/complementaryTaskCategorySchema', // <--- CORREÇÃO AQUI
    };

    const complementaryTaskSchema = {
        name: 'complementaryTaskSchema',
        schema: '../persistence/schemas/complementaryTaskSchema',
    };

    const visitExecutionSchema = {
        name: 'visitExecutionSchema',
        schema: '../persistence/schemas/visitExecutionSchema',
    };

    const operationPlanSchema = {
        name: 'operationPlanSchema',
        schema: '../persistence/schemas/operationPlanSchema',
    };

    const privacyPolicySchema = {
        name: 'privacyPolicySchema',
        schema: '../persistence/schemas/privacyPolicySchema'
    };

    const incidentSchema = { name: 'incidentSchema', schema: '../persistence/schemas/incidentSchema' };


    // --- CONTROLLERS ---
    const roleController = {
        name: config.controllers.role.name,
        path: config.controllers.role.path
    }

    const complementaryTaskCategoryController = {
        name: config.controllers.complementaryTaskCategory.name,
        path: config.controllers.complementaryTaskCategory.path
    };

    const complementaryTaskController = {
        name: 'ComplementaryTaskController',
        path: '../controllers/complementaryTaskController'
    };

    const visitExecutionController = {
        name: 'VisitExecutionController',
        path: '../controllers/visitExecutionController'
    };

    const operationPlanController = {
        name: 'OperationPlanController',
        path: '../controllers/operationPlanController'
    };


    // --- REPOS ---
    const roleRepo = {
        name: config.repos.role.name,
        path: config.repos.role.path
    }

    const userRepo = {
        name: config.repos.user.name,
        path: config.repos.user.path
    }

    const complementaryTaskCategoryRepo = {
        name: config.repos.complementaryTaskCategory.name,
        path: config.repos.complementaryTaskCategory.path
    };

    const complementaryTaskRepo = {
        name: 'ComplementaryTaskRepo',
        path: '../repos/complementaryTaskRepo'
    };

    const visitExecutionRepo = {
        name: 'VisitExecutionRepo',
        path: '../repos/visitExecutionRepo'
    };

    const operationPlanRepo = {
        name: 'OperationPlanRepo',
        path: '../repos/operationPlanRepo'
    };

    // --- SERVICES ---
    const roleService = {
        name: config.services.role.name,
        path: config.services.role.path
    }

    const complementaryTaskCategoryService = {
        name: config.services.complementaryTaskCategory.name,
        path: config.services.complementaryTaskCategory.path
    };

    const complementaryTaskService = {
        name: 'ComplementaryTaskService',
        path: '../services/complementaryTaskService'
    };

    const visitExecutionService = {
        name: 'VisitExecutionService',
        path: '../services/visitExecutionService'
    };

    const operationPlanService = {
        name: 'OperationPlanService',
        path: '../services/operationPlanService'
    };

    await dependencyInjectorLoader({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            complementaryTaskCategorySchema,
            complementaryTaskSchema,
            visitExecutionSchema,
            operationPlanSchema,
            privacyPolicySchema,
            incidentSchema
        ],
        controllers: [
            roleController,
            complementaryTaskCategoryController,
            complementaryTaskController,
            visitExecutionController,
            operationPlanController,
            operationPlanController
        ],
        repos: [
            roleRepo,
            userRepo,
            complementaryTaskCategoryRepo,
            complementaryTaskRepo,
            visitExecutionRepo,
            operationPlanRepo
        ],
        services: [
            roleService,
            complementaryTaskCategoryService,
            complementaryTaskService,
            visitExecutionService,
            operationPlanService
        ]
    });

    Logger.info('✌️ Dependency Injector loaded');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};