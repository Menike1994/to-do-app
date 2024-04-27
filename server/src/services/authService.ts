import { ERRORS } from "../const/ERRORS";
import { User } from "../models/user";
import { createUser, getUserByEmail, getUserByEmailAndPwd } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const signInUser = async (user: User) => {

    let _user = await getUserByEmail(user.email);
    if (_user) {
        const isPWDMatch = await bcrypt.compare(user.password, _user.password);
        if (isPWDMatch) {
            const token = _generateJWT(_user);
            return token;
        } else {
            throw ERRORS.INVALID_CREDENTIALS
        }
    } else {
        throw ERRORS.INTERNAL_ERROR;
    }
}

export const signUpUser = async (user: User) => {
    let _user = await getUserByEmail(user.email);
    if (!_user) {
        let pwd = await bcrypt.hash(user.password, 10);
        await createUser(user.email, pwd);
        _user = await getUserByEmailAndPwd(user.email, pwd);
        const token = _generateJWT(_user);
        return token;
    } else {
        throw ERRORS.USER_ALREADY_EXIST;
    }
}

const _generateJWT = (user: User) => {
    return jwt.sign({ userId: user.id, emai: user.email }, process.env.JWT_SECRET!, {
        expiresIn: '6h',
    });
}
