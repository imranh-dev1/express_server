import type { Request, Response } from "express"
import { profileService } from "./profile.service"

const caretProfile =async (req: Request, res: Response) => {
    try {
        const result = await profileService.createProfileIntoDB(req.body);

        res.status(201).json({
            success: true,
            message: "Profle Created successfully!",
            data: result,
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Profle not cereated!",
            data: {},
        })
    }
}


export const profileController = {
    caretProfile,
}