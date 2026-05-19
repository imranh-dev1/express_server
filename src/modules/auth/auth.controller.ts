import type { Request, Response } from "express";
import { authService } from "./auth.service";

const signInUser = async (req: Request, res: Response) => {
    try {

        const result = await authService.singInUserFromDB(req.body);

        // console.log(result)

        res.status(200).json({
            success: true,
            message: "User signIn successfully!",
            data: {result},
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}

export const authController = {
    signInUser,
}