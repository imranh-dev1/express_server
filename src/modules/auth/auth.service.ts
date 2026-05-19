import { pool } from "../../db";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import config from "../../config";

const singInUserFromDB = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;
    // console.log(email, password);

    const result = await pool.query(`
        SELECT * FROM users WHERE email = $1;
    `, [email])

    if (result.rows.length === 0) {
        throw new Error("User not found")
    }

    const user = result.rows[0];

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
        throw new Error("Wrong email and password")
    }

    const userPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at

    }
    console.log(userPayload)

    const accessToken = jwt.sign(userPayload, config.jwt_secret as string, {
        expiresIn: "1d"
    })
    // console.log(accessToken)
    return accessToken;

}

export const authService = {
    singInUserFromDB,
}