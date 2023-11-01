import crypto from 'crypto';
import express, { Request, Response } from 'express';
import { createUser, getUserByEmail } from './actions/userAction';
import dotenv from 'dotenv';
import User from './models/userModel';

dotenv.config();

const SECRET = 'IMG-SHARE-API-SECRET';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !username || !password) {
            return res.sendStatus(400);
        }

        const existUser = await getUserByEmail(email);
        if (existUser) {
            res.status(400);
            return res.send('User with email already exits');
        }

        const salt = random();

        const user = createUser(req, salt);

        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};

export const login = async (req: Request, res: Response) => {
    try {

        const { username, email, password } = req.body;

        if (!email || !username || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+salt +password +sessionToken');
        if (!user) {
            res.status(400);
            return res.send("User does not exists");
        }

        const expectedHash = authentication(user.salt, password);
        if (expectedHash !== user.password) {
            res.status(403);
            return res.send('Incorrect credentials');
        }

        const salt = random();
        user.sessionToken = authentication(salt, user._id.toString());
        await user.save();

        return res.cookie('IMG-SHARE', user.sessionToken, {  path: '/' }).status(200).json(user).end();

    } catch (err) {
        console.log(err);
        res.status(400);
        res.send('Login error');
    }
}