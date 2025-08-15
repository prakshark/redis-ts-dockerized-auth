import express from "express";
import { loginUser, registerUser, logoutUser, getProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/profile", protectRoute, getProfile);

export default router;