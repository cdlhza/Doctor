import { Router } from 'express';
import { login, register,logout, profile, verifyToken} from '../controllers/auth.controller.js';
import { authRequiered } from "../middlewares/validateToken.js";

//Importar el validtor shema
import { validateSchema } from '../middlewares/validator.middleware.js';
//Importamos los esquemas de validacion
import { registerShema, loginSchema } from '../schemas/auth.schemas.js';

const router = Router();

router.get('/verify', verifyToken);

router.post('/register',validateSchema(registerShema),register);

router.post('/login',validateSchema(loginSchema) ,login);

router.post('/logout',logout);

router.get('/profile',authRequiered ,profile);


export default router;