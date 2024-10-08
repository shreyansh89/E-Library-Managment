const passport = require('passport');

const User = require('../models/user');

const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;


var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'JWTPR',
}

// passport.use("userverify", new JwtStrategy(opts, async (record, done) => {
//     // console.log(record);
//     let data = await User.findById(record.userData._id);
//     data ? done(null, data) : done(null, false);

// }));

passport.use("userverify", new JwtStrategy(opts, async (record, done) => {
    try {
        console.log("Token payload:", record); // Log the JWT payload to see if it's correct
        const user = await User.findById(record.userData._id);
        if (user) {
            console.log("User found:", user); // Log the user to verify if they're found
            return done(null, user);
        } else {
            console.log("User not found");
            return done(null, false, { message: "User not found" });
        }
    } catch (error) {
        console.error("Error in JWT strategy:", error);
        return done(error, false);
    }
}));


passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let recheck = await User.findById(id);
    recheck ? done(null, recheck) : done(null, false);
});