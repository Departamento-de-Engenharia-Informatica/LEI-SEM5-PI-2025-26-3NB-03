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

    // --- CONTROLLERS ---
    const roleController = {
        name: config.controllers.role.name,
        path: config.controllers.role.path
    }

    const complementaryTaskCategoryController = {
        name: config.controllers.complementaryTaskCategory.name,
        path: config.controllers.complementaryTaskCategory.path
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

    // --- SERVICES ---
    const roleService = {
        name: config.services.role.name,
        path: config.services.role.path
    }

    const complementaryTaskCategoryService = {
        name: config.services.complementaryTaskCategory.name,
        path: config.services.complementaryTaskCategory.path
    };

    await dependencyInjectorLoader({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            complementaryTaskCategorySchema
        ],
        controllers: [
            roleController,
            complementaryTaskCategoryController
        ],
        repos: [
            roleRepo,
            userRepo,
            complementaryTaskCategoryRepo
        ],
        services: [
            roleService,
            complementaryTaskCategoryService
        ]
    });

    Logger.info('✌️ Dependency Injector loaded');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};