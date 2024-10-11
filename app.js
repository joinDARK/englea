import express from "express"
import userRouter from "./server/routers/userRouters.js"

const app = express()
let port = 3000

app.use(express.json())

app.use("/user", userRouter)

app.listen(port, function(){
  console.log("Сервер запущен");
});