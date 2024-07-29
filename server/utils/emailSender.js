import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env.SECURE),
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
})

const emailVerification = async (email, otp) =>{
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "OTP for Forgot Password",
    html: `
    <p>Hello,</p>
    <p>Please use the following OTP to reset your password. This OTP will expire in 1 minute</p>
    <p>Verify Email using this ${otp}</p>
    <p>If you have any issues or concerns, please don't hesitate to reach out to us at <a href="mailto:adigunkafy27@gmail.com">adigunkafy27@gmail.com</a>.</p>
    <p>Best regards,<br>ChatFusion Team</p>
  `
  }
  try {
    await transporter.sendMail(mailOptions)
    console.log("Email sent successfully")
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Unable to send email")
  }
 
}

export default emailVerification;