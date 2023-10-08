import mongoose, { Schema } from 'mongoose';
import Image from './imageModel';

const UserSchema: mongoose.Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    salt: {
        type: String,
        select: false
    },
    sessionToken: {
        type: String,
        select: false
    },
    // profileImage: {
    //     data: Buffer,
    //     contentType: String
    // },
    sharedImages: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Image'}],
        required: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
export default User;