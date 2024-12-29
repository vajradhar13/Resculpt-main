import { Router } from 'express';
import { forgotPassword, logout, signin, signup, profile, resetPassword, authCheck } from '../controllers/auth';
import { authMiddleware } from '../middlewares/authMiddleware';

const authRoutes: Router = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.post('/forgotpassword', forgotPassword);
authRoutes.get('/profile', authMiddleware, profile);
authRoutes.post('/resetpassword/:token', authMiddleware, resetPassword);
authRoutes.get('/authCheck', authMiddleware, authCheck);
authRoutes.post('/logout', logout);

export default authRoutes;