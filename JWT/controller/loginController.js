import 'dotenv/config';
import bcrypt from "bcryptjs";
import userModel from "../models/userSchema.js";
import jwt from 'jsonwebtoken';

export const LoginController = async(req, res) => {
    try {
        const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            message: 'All fields are required'
        });
    }

    const emailExist = await userModel.findOne({ email });

    if (!emailExist) {
        return res.status(400).send({
            message: 'Invalid email or password'
        });
    }

    // console.log(emailExist)

    const validPassword = await bcrypt.compare(password, emailExist.password);

    if (!validPassword) {
        return res.status(400).send({
            message: 'Invalid email or password'
        })
    }

    let token = jwt.sign({
        email: emailExist.email
    }, process.env.JWT_SECRET_KEY);

    console.log(token)

    res.status(200).send({
        message: 'Login successful'
    })

    } catch (error) {
        console.log(error)
    }
}