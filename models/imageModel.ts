import mongoose, { Schema } from "mongoose";
import User from '../models/userModel';

const imageSchema: Schema = new mongoose.Schema({
    postName: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    imageData: {
        type: String, // Store the image data as base64
        required: true,
    },
    description: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const Image = mongoose.model('Image', imageSchema);


export default Image;