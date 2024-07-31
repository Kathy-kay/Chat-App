import express from "express"
import { emailVerify, getUserInfo, login, otpVerification, resetPassword, signup, updateUserProfile } from "../controller/userController"
import validateToken from "../middleware/validateToken"

const router = express.Router()

router.post("/register", signup)
router.post("login", login)
router.post("forgot-password/email-verify", emailVerify)
router.post("/forgot-password/otp-verify", otpVerification)
router.post("/reset-password", resetPassword)
router.get("/user", validateToken, getUserInfo)
router.post("/user/update", validateToken, updateUserProfile)


export default router