import bcrypt from "bcrypt"
import { validationResult } from "express-validator"
import User from "../models/userModel.js"
import { generateAccessToken, generateRefreshToken } from "../utils/jwtToken.js"

const saltRounds = 7

class UserController {
  async registration(req, res) {
    try {
      // Валидация данных. Возвращает сообщение при ошибке
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return res.status(400).json(errors)
      }
      
      const { login, password } = req.body
      const hashPassword = bcrypt.hashSync(password, saltRounds)
      
      let newUser = await User.create({ login: login, password: hashPassword })

      if(newUser) {
        res.status(201).json("Create")
      } else {
        res.status(404).json(newUser)
      }
    } catch(e) {
      console.log(e)
      res.status(500).json(e)
    }
  }
  
  async authorization(req, res) {
    try {
      const { login, password } = req.body
      
      const dataUser = await User.read({ login: login })

      if(!dataUser) {
        return res.status(404).json("Invalid Login")
      }
      
      const validPassword = bcrypt.compareSync(password, dataUser.password)
      if(!validPassword) {
        return res.status(404).json("Invalid Password")
      }
      
      const accesToken = generateAccessToken({id: dataUser.id, login: dataUser.login, role: dataUser.role})
      const refreshToken = generateRefreshToken({id: dataUser.id, login: dataUser.login, role: dataUser.role})

      return res.status(201).json({ accesToken, refreshToken });
    } catch(e) {
      console.log(e)
      res.status(500).json(e)
    }
  }
  
  async updateInfo(req, res) {
    try {
      // Валидация данных. Возвращает сообщение при ошибке
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return res.status(400).json(errors)
      }
      
      const { id } = req.user;
      const { login, password } = req.body;
      const hashPassword = bcrypt.hashSync(password, saltRounds)
      User.update({login: login, password: hashPassword, id: id})
      res.status(200).json("Update");
    } catch(e) {
      console.log(e)
      res.status(500).json(e)
    }
  }
  
  async deleteUser(req, res) {
    try {
      const { id } = req.user;
      User.delete({id: id})
      res.status(204).json("Delete");
    } catch(e) {
      console.log(e)
      res.status(500).json(e)
    }
  }
} 

export default new UserController()