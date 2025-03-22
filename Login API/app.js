import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import userModel from './models/userSchema.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URL = 'mongodb+srv://admin:admin@cluster0.uiacs.mongodb.net/';

mongoose.connect(MONGO_URL);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error:', err);
});

const PORT = 3000;

// Signup API

app.post('/api/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const emailExist = await userModel.findOne({ email });
        if (emailExist !== null) {
            return res.status(400).send({ message: 'Email already exists' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const saveData = await userModel.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword
        });

        res.status(201).json({
            message: 'User created successfully',
            saveData
        });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});


// Login API

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            message: 'All fields are required'
        });
    }

    const emailExist = await userModel.findOne({ email });

    if (!emailExist) {
        return res.status(400).send({
            message: 'Invalid email'
        });
    }

    // console.log(emailExist)

    const validPassword = await bcrypt.compare(password, emailExist.password);

    if (!validPassword) {
        return res.status(400).send({
            message: 'Invalid password'
        })
    }

    res.status(200).send({
        message: 'Login successful'
    })

});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});