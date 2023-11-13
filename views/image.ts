import mongoose from 'mongoose';
import express from 'express';
import Image from '../models/imageModel';
import { authentication } from '../authenticate';

export const getImages = () => Image.find({}).populate('uploadedBy').exec();
export const getImageByUsername = (username: string) => Image.findOne({ uploadedBy: { username: username } }).populate('uploadedBy').exec();
export const getImageById = (id: string) => Image.findById(id);
export const createImage = (req: express.Request) => {
    const { base64Image, user, imageName } = req.body;
    const image = new Image({ postName: imageName, uploadedBy: user, imageData: base64Image });
    image.save().then((res) => res.toObject()).catch(err => console.log(err));
    return image;
};
export const delelteImageById = (id: string) => Image.findOneAndDelete({ _id: id });
