import mongoose from 'mongoose';
import express from 'express';
import User from '../models/userModel';
import { authentication } from '../authenticate';

export const getUsers = () => User.find({}).populate('sharedImages').exec();
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserByUsername = (username: string) => User.findOne({ username });
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ sessionToken });
export const getUserById = (id: string) => User.findById(id);
export const createUser = (req: express.Request, salt: string) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password: authentication(salt, password), salt});
    user.save().then((res) => res.toObject());
    return user;
};
export const delelteUserById = (id: string) => User.findOneAndDelete({ _id: id });
