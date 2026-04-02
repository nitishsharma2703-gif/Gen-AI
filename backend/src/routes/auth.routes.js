import {Router} from 'express';

const authRouter = Router();

import * as authController from "../controllers/auth.controller.js";
import * as authMiddleware  from '../middlewares/auth.middleware.js';



/**
 * @route POST /api/auth/register 
 * @description Register a new user ®️
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login 
 * @description Login user with email and password ®️
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route GRT /api/auth/logout 
 * @description Clear token from user cookie and add the token in blacklist ®️
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController);

/**
 * @route GRT /api/auth/get-me
 * @description het the current logged in user details®️
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController);


export default authRouter