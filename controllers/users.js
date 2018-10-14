const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_SECRET } = require('../configuration/config');

const signToken = user =>{
   return jwt.sign({
        iss: 'jerry107',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 2)
    }, JWT_SECRET);
};

module.exports = {
    signUp: async (req, res, next) => {

        const { email, password } = req.value.body;

        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).json({ error: "Email is already use"});
        }
        const newUser = new User({ email, password });
        await newUser.save();

        const token = signToken(newUser);

        res.status(200).json({ token: token });
    },

    signIn: async (req, res, next) => {
        console.log('UsersController.signIn() called !')
    },
    secret: async (req, res, next) => {
        console.log('UsersController.secret() called !')
    },
};