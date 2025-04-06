import bcrypt from "bcryptjs";
import userModel from "../models/userSchema.js";

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

    res.status(200).send({
        message: 'Login successful'
    })

    } catch (error) {
        console.log(error)
    }
}