import express from 'express'
// import router from './router'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import {LoginUser, SignUpNewUser} from './handlers/user'
import {protect} from './modules/auth'
import router from './router'

dotenv.config()

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(express.urlencoded({extended: true}))
app.use('/api', protect, router)

app.post('/signup', SignUpNewUser)
app.post('/login', LoginUser)

app.listen(process.env.PORT || 80, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`)
})
