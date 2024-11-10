import UserModel from '../models/users.js';
import _ from 'lodash';
import { successObj, errorObj } from '../../settings.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
const secret = process.env.SECRET

const exp = {
    add: (data) => {
        return new Promise(async (resolve) => {
            try {
                let newUser = new UserModel();
                newUser.password = await bcryptjs.hash(data.password, 12)
                newUser.email = data.email;
                newUser.name = data.name
                console.log("🚀 => data:", data);
                let user = await newUser.save();
                return resolve({ ...successObj, data: user })
            } catch (error) {
                console.log(error)
                return resolve({ ...errorObj, message: error.message });
            }
        });
    },
    login: (data) => {
        return new Promise(async (resolve) => {
            try {
                if (!data.email || !data.password) {
                    return resolve({ ...errorObj, message: "Email and Password are required" });
                }
                let user = await UserModel.findOne({ email: data.email });
                if (!user) {
                    return resolve({ ...errorObj, message: "User not found" });
                }
                const match = await bcryptjs.compare(data.password, user.password);
                if (!match) {
                    return resolve({ ...errorObj, message: "Wrong Password" });
                }
                let token = jwt.sign(user._id.toString(), secret);
                return resolve({ ...successObj, data: token });
            } catch (error) {
                console.log(error)
                return resolve({ ...errorObj, message: error.message });
            }
        });
    }
}


export default exp;