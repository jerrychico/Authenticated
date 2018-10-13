const User = require('../models/users');
module.exports = {
    signUp: async (req, res, next) => {%G

        const { email, password } = req.value.body;

        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).json({ error: "Email is already use"});
        }
        const newUser = new User({ email, password });
        await newUser.save();

        res.json({
            user: "user created"
        });
    },

    signIn: async (req, res, next) => {
        console.log('UsersController.signIn() called !')
    },
    secret: async (req, res, next) => {
        console.log('UsersController.secret() called !')
    },
};