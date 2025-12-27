import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import RoleController from "./roleController";
import IRoleService from "../services/IServices/IRoleService";
import IRoleDTO from '../dto/IRoleDTO';

describe('role controller', function () {
    this.timeout(10000);

    const sandbox = sinon.createSandbox();

    beforeEach(function() {

        Container.reset();


        let roleSchemaInstance = require("../persistence/schemas/roleSchema").default;
        Container.set("roleSchema", roleSchemaInstance);


        let roleRepoClass = require("../repos/roleRepo").default;
        let roleRepoInstance = Container.get(roleRepoClass);

        Container.set("RoleRepo", roleRepoInstance);


        let roleServiceClass = require("../services/roleService").default;
        let roleServiceInstance = Container.get(roleServiceClass);

        Container.set("RoleService", roleServiceInstance);
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('createRole: returns json with id+name values', async function () {
        let body = { "name":'role12' };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => {};


        let roleServiceInstance = Container.get("RoleService");


        sinon.stub(roleServiceInstance, "createRole").returns( Result.ok<IRoleDTO>( {"id":"123", "name": req.body.name} ));


        const ctrl = new RoleController(roleServiceInstance as IRoleService);


        await ctrl.createRole(req as Request, res as Response, next as NextFunction);


        sinon.assert.calledOnce(res.json as sinon.SinonSpy);
        sinon.assert.calledWith(res.json as sinon.SinonSpy, sinon.match({ "id": "123", "name": req.body.name}));
    });
});