import express from 'express';
import { SignUpController } from '../controller/signupController.js';
import { LoginController } from '../controller/loginController.js';
import { tokenVerification } from './middleware/middleware.js';

const router = express.Router();

router.route('/api/signup').post(SignUpController);
router.route('/api/login').post(LoginController);
router.route('/api/getallusers').get(tokenVerification, LoginController);

export default router;