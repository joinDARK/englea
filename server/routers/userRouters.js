import express from "express"
import { check } from "express-validator"
import UserController from "../controllers/userController.js"
import { checkUser, refreshToken } from "../middleware/userMiddleware.js"

const userRouter = express.Router()

userRouter.post('/auth', UserController.authorization)

userRouter.post('/reg', [
  check("login", "Имя пользователя не может быть пустым").notEmpty(),
  check("password", "Пароль должен быть от 8 до 14 символов").isLength({min: 8, max: 14})
], UserController.registration)

userRouter.put('/', checkUser, UserController.updateInfo)

userRouter.delete('/', checkUser, UserController.deleteUser)

export default userRouter