import User from '../models/User';

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // check whether the user exists or not
        let user = await User.findOneAndUpdate({ email });
        if (user) {
            // return res.status(400).json({ message: "User have already registerd" })
            throw new Error("User have already registered")
        }
        user = await User.create({
            name, email, password,
        })
        return res.status(201)({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verfied: user.verfied,
            admin: user.admin,
            token: await user.generateJWT(),
        });
    } catch (error) {
        next(error);
    }
};

export { registerUser };