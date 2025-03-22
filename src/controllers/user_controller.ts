import bcrypt from "bcrypt";
import { User } from "../models/user_model";

async function register(email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email: email,
        username: username,
        password: hashedPassword,
        isAdmin: false
    });
    return user;
}

async function getUserByName (username: string) {
    const user = await User.findOne({ where: { username: username } });
    return user?.toJSON();
}

async function getUserByEmail (email: string) {
    const user = await User.findOne({ where: { email: email } });
    return user?.toJSON();
}

export { register, getUserByName, getUserByEmail };