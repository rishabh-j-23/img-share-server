import express, { Request, Response } from 'express';
import { register } from '../authenticate';
import bodyParser from 'body-parser';

const registerRouter = express.Router();
registerRouter.use(bodyParser.json());

registerRouter.route('/auth/register').post(register);

export default registerRouter;