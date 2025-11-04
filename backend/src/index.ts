import express, { Request, Response, NextFunction } from 'express'
import databaseService from './services/database.services'
import authRouter from './routes/auth.routers'
import { defaultErrorHandler } from './middlewares/error.middlewares'

// dựng server
const app = express()
const port = 8080
databaseService.connect() //kết nối với mongoDB
// cho server kết nối với userRoute
app.use(express.json())
app.use('/auth', authRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server BE đang chạy trên PORT: ${port}`)
})
