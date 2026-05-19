import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router()

router.post("/signin", authController.signInUser)

export const authRoute = router;