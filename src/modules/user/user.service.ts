import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password, age, country } = payload;

    const result = await pool.query(
        `
     INSERT INTO users(name,email,password,age, country) VALUES($1,$2,$3,$4, $5) RETURNING *
    `,
        [name, email, password, age, country],
    );
    return result;
};

export const userService = {
    createUserIntoDB,
};