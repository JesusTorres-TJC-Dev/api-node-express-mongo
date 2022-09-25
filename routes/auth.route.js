import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const authRouter = express.Router()

authRouter.post(
    '/register',
    [
        body("email", "Formato de Email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Minimo 6 caracteres")
            .trim()
            .isLength({ min: 6 }),
        body("password", "Formato de password incorrecta")
            .custom((value, {req}) => {
                if(value !== req.body.repassword){
                    throw new Error('No coinciden las contrasenhas')
                }

                return value
            })
    ],
    validationResultExpress,
    register
)
authRouter.post(
    '/login',
    [
        body("email", "Formato de Email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
    ],
    validationResultExpress,
    login
)

export default authRouter;