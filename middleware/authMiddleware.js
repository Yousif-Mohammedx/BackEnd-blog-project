import { verify } from 'jsonwebtoken';
import User from '../models/User';

export const authGuard = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            const { id } = verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(id).select('-password');
            next();
        } else {
            let error = new Error('Not authorized, No token');
            error.statusCode = 401;
            throw error;
        }
    } catch (error) {
        error.message = 'Not authorized, Token failed';
        error.statusCode = 401;
        next(error);
    }
};