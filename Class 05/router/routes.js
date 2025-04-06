import express from 'express';
import { SignUpController } from '../controller/signupController.js';
import { LoginController } from '../controller/loginController.js';

const router = express.Router();

router.route('/api/signup').post(SignUpController);
router.route('/api/login').post(LoginController);

export default router;