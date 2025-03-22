import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { getUserByName } from "../controllers/user_controller";

// configure local strategy
passport.use(new passportLocal.Strategy(async (username, password, cb) => {
    try {
        const user = await getUserByName(username);
        if (!user) return cb(null, false, { message: 'User not found.' });
        if (await bcrypt.compare(password, user.password)) return cb(null, user);
        return cb(null, false, { message: 'Password not correct.' });
    } catch (error) {
        return cb(error, false);
    }
}));

export { passport }