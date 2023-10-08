import mongoose, { Schema } from "mongoose";
import User from '../models/userModel'

const ImageSchema = new mongoose.Schema({
    postName: {
        type: String,
        // required: true
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    },
    imageName: {
        data: Buffer,
        // required: true,
        contentType: String
    }
}, { timestamps: true });

const Image = mongoose.model('Image', ImageSchema);

export default Image;