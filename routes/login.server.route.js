import express from 'express';
//import controller file
import * as loginController from '../controllers/login.server.controller';

// get an instance of express router
const router = express.Router();
router.route('/')
     .post(loginController.authenticateUser)

export default router;