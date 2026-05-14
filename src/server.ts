import express, { type Application, type Request, type Response } from 'express'

const app: Application = express()
const port = 5000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        "serverName": "express_server",
        "exploring": "Express & Typescript"
    })
})

app.post("/user", (req: Request, res: Response) => {
    // console.log(req.body)
    const { id, name, email, password, explore } = req.body;
    const user = {
        id, name, email, explore
    }
    res.status(201).json({
        meassage: "User created successfully",
        data: user
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
