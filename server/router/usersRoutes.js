import express from "express"
import { emailVerify, login, otpVerification, resetPassword, signup } from "../controller/userController"

const router = express.Router()

router.post("/register", signup)
router.post("login", login)
router.post("forgot-password/email-verify", emailVerify)
router.post("/forgot-password/otp-verify", otpVerification)
router.post("/reset-password", resetPassword)


export default router