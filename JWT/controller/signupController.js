import e from "express";
import userModel from "../models/userSchema.js";
import bcrypt from "bcryptjs";


export const SignUpController = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const emailExist = await userModel.findOne({ email });
        console.log(emailExist._id)
        if (emailExist !== null) {
            return res.status(400).send({ message: 'Email already exists' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const saveData = await userModel.create({
            name,
            email,
            password: encryptedPassword
        });

        res.status(201).json({
            message: 'User created successfully',
            saveData
        });

    } catch (error) {
        console.log(error)
    }
}