import express, { type Application, type Request, type Response } from 'express'
import { Pool } from 'pg'

const app: Application = express()
const port = 5000

app.use(express.json())
const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_Lz0vQ9VIORZh@ep-proud-surf-aqdmiayp-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            age INT,
            country VARCHAR(255),
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `);

    console.log("Database connected successfully!");
}

initDB();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        "serverName": "express_server",
        "exploring": "Express & Typescript"
    })
})

app.post("/api/users", async (req: Request, res: Response) => {
    // console.log(req.body)
    const { id, name, email, password, explore } = req.body;
    const user = {
        id, name, email, explore
    }
    const result = await pool.query(` 
        INSTER INTO users ()
        `

    )

    res.status(201).json({
        meassage: "User created successfully",
        data: user
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
