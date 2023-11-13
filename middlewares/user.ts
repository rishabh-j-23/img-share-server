import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../views/user';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.headers['sessiontoken'];
        if (!sessionToken) {
            return res.sendStatus(400);
        }
        const existingUser = await getUserBySessionToken(sessionToken.toString());

        if (!existingUser) {
            return res.sendStatus(403);
        }
        merge(req, { identity: existingUser });
        return next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: "sessiontoken not found" });
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            return res.sendStatus(403);
        }

        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}