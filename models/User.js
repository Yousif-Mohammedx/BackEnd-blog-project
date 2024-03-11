import { Schema, model } from "mongoose";
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const UserSchema = new Schema({
    avatar: { type: String, default: "" },
    name: { type: String, requierd: true },
    email: { type: String, requierd: true },
    password: { type: String, requierd: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, requierd: false },
    admin: { type: Boolean, default: false },
}, { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 10);
        return next()
    }
    return next()
})

UserSchema.methods.generateJWT = async function () {
    return await sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

UserSchema.methods.comparePassword = async function (enteredpassword) {
    return awaitcompare(enteredpassword, this.password);
};

const User = model("User", UserSchema);
export default User;