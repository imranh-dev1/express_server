import express, { type Application, type Request, type Response } from 'express'
import config from './config'
import { userRoute } from './modules/user/user.route'
import { profileRoute } from './modules/profile/profile.route'

const app: Application = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        "serverName": "express_server",
        "exploring": "Express & Typescript"
    })
})

app.use("/api/users", userRoute)
app.use("/api/profiles", profileRoute)


export default app;