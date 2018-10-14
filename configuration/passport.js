const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const { JWT_SECRET } = require('../configuration/config');
const User = require('../models/users');


//WEB JSON TOKEN Strategy

passport.use(new JwtStrategy({
   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
   secretOrKey: JWT_SECRET
}, async (payload, done)=>{
    try {
        //find the user specified in token
        const user = await User.findById(payload.sub);

        //if user don't exists , handle it
        if (!user) {
            return done(null, false);
        }
        // Other wise, return the user
        done(null, user);
    }catch (e) {
        done(e, false)
    }
}));

// LOCAL Strategy
passport.use(new LocalStrategy({

},async (email, password, done) => {

    const user = await User.findOne({ email });
    if (!user){
        return done(null, false);
    }
}));