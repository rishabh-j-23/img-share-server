import express from 'express';
import { delelteUserById, getUserById, getUserBySessionToken, getUsers } from '../views/user';

export const getAllUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await delelteUserById(id);
        return res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUserBySession = async (req: express.Request, res: express.Response) => {
    try {
        const { token } = req.query;
        const user = await getUserBySessionToken(token.toString());
        return res.status(200).json(user);
    } catch (error) {
        console.log("session error");
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}