import { pool } from "../../db";
import type { IProfile } from "./profile.interface";

const createProfileIntoDB = async (payload: IProfile) => {
    const { user_id, bio, address, gender } = payload;

    const user = await pool.query(
        `SELECT * FROM users WHERE id = $1`,
        [user_id]
    );

    if (user.rows.length === 0) {
        throw new Error("User does not exist");
    }

    const result = await pool.query(
        `INSERT INTO profile(user_id, bio, address, gender)
         VALUES($1, $2, $3, $4)
         RETURNING *`,
        [user_id, bio, address, gender]
    );

    return result.rows;
};

export const profileService = {
    createProfileIntoDB,
};