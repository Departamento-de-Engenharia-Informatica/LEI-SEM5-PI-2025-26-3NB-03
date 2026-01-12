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

    const auditLogSchema = {
        name: 'auditLogSchema',
        schema: '../persistence/schemas/auditLogSchema',
    };
  

    const operationPlanSchema = {
        name: 'operationPlanSchema',
        schema: '../persistence/schemas/operationPlanSchema',
    };

    const privacyPolicySchema = {
        name: 'privacyPolicySchema',
        schema: '../persistence/schemas/privacyPolicySchema'
    };


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

    const auditLogController = { 
        name: 'AuditLogController', 
        path: '../controllers/auditLogController' 
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

    const auditLogRepo = {
        name: 'AuditLogRepo',
        path: '../repos/auditLogRepo'
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

    const auditLogService = { name: 'AuditLogService', 
        path: '../services/auditLogService' 
    };

    

    await dependencyInjectorLoader({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            complementaryTaskCategorySchema,
            complementaryTaskSchema,
            visitExecutionSchema,
            auditLogSchema,
            operationPlanSchema,
            privacyPolicySchema
        ],
        controllers: [
            roleController,
            complementaryTaskCategoryController,
            complementaryTaskController,
            visitExecutionController,
            operationPlanController,
            auditLogController
        ],
        repos: [
            roleRepo,
            userRepo,
            complementaryTaskCategoryRepo,
            complementaryTaskRepo,
            visitExecutionRepo,
            auditLogRepo,
            operationPlanRepo
        ],
        services: [
            roleService,
            complementaryTaskCategoryService,
            complementaryTaskService,
            visitExecutionService,
            operationPlanService,
            auditLogService
        ]
    });

    Logger.info('✌️ Dependency Injector loaded');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};