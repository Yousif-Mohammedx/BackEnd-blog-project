import User from '../models/User';

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // check whether the user exists or not
        let user = await User.findOneAndUpdate({ email });
        if (user) {
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
            verified: user.verified,
            admin: user.admin,
            token: await user.generateJWT(),
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            throw new Error("Email not found");
        }
        if (await user.comparePassword(password)) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
                token: await user.generateJWT(),
            });
        } else {
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        next(error);
    }
};

const userProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        if (user) {
            return res.status(201)({
                _id: user._id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
            });
        } else {
            let error = new Error("User not found");
            error.statusCode = 404;
            next(error)
        }
    } catch (error) {
        next(error);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if (!user) {
            throw new Error("User not found")
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password && req.body.password.length < 6) {
            throw new Error("Password length must be at least 6 character")

        } else if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUserProfile = await user.save();
        res.json({
            _id: updateUserProfile._id,
            avatar: updateUserProfile.avatar,
            name: updateUserProfile.name,
            email: updateUserProfile.email,
            verified: updateUserProfile.verified,
            admin: updateUserProfile.admin,
            token: await updateUserProfile.generateJWT(),
        });
    } catch (error) {
        next(error);
    }
};

const updateProfilePicture = async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
}
export { registerUser, loginUser, userProfile, updateProfile, updateProfilePicture };