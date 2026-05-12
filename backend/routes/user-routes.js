import {Router} from "express";
import * as controllers from "../controllers/user-controller.js"
import { isAuthenticated } from "../middleware/auth-middleware.js";
const router = Router();

router.post("/register", controllers.registerUser)
router.post("/login", controllers.loginUser)
router.post("/verify", controllers.verification)
router.post("/forgot-password", controllers.forgotpassword)
router.post("/logout", isAuthenticated, controllers.logout)
router.post("/verify-otp/:email", controllers.verifyOtp)

export default router