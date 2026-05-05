import {Router} from "express";
import * as controlles from "../controllers/user-controller.js"
const router = Router();

router.post("/register")
router.post("/login")

export default router