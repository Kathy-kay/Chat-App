import User from "../models/userModels";
import bcrypt from "bcrypt"
import generate from "otp-generator"
import jwt from "jsonwebtoken"
import emailVerification from "../utils/emailSender";



export const signup = async (req, res) => {

  try {
    const {email, password, confirmPassword} = req.body
  
  //validate email and password
  if(!email || !password || !confirmPassword){
    return res.status(400).json({message: "All fields are required"})
  }

  if(password !== confirmPassword){
    return res.status(400).json({message: "Password and confirm Password do not match"})
  }
  //check if email already exist
  const userExist = await User.findOne({email})
  if(userExist){
    return res.status(400).json({message: "User with given emial already exist"})
  }

  //hash password
  const saltRounds = process.env.SALT_ROUNDS
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  //create ne user
  const newUser = await User.create({
    email, 
    password: hashedPassword,
  })
  return res.status(201).json({message: "User created successfully"})
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"})
  }
}

export const login = async(req, res) =>{
 try {

  const { email, password } = req.body;

  //validate the fields
  if(!email || !password){
    return res.status(400).json({message: "All fields are required"})
  }

  //find the user with email
  const user = await User.findOne({email})

  //check if user exist and compare the password with the hashed password
  if(user && (await bcrypt.compare(password, user.hashedPassword))){
    const accessToken = jwt.sign({
      user: {
        email: user.email,
        id: user.id
      }
    },process.env.ACCESS_TOKEN,
    {expiresIn: "1h"}
    )
  //set token in cookies
    res.cookie(
      "token", accessToken,
      {
        httpOnly: true,
        secure:process.env.NODE_ENV === production
      }
    )
    return res.status(200).json({message: "Login successful", token: accessToken})
  }
  else{
    return res.status(400).json({message: "Invalid email or password"})
  }
 } catch (error) {
  console.log(error)
 }
}

//email verification
export const emailVerify = async(req, res) =>{
  try {
    const {email} = req.body

    //check if the field is filled
    if(!email){
      return res.status(400).json({message: "Email is required"})
    }
    //check if email exist
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message: "No user found with the provided email"})
    } 

    //generate token
    const otp = generate(6, {
      digits: true,
      alphabets: false,
      uppercase: false,
      specialChars: false
    })
    const otpExpires = Date.now() + 1 * 60 * 1000

     // Update user with OTP and expiration
    await user.updateOne({ otp, otpExpires});

    //send verification email
    await emailVerification(email, otp)
   res.status(200).json({message: "OTP sent to email"})
  } catch (error) {
    console.log(error )
    res.status(500).json({message: "Internal server error"})
  }
}


//otp verification
export const otpVerification = async(req, res) => {
  try {
    const {otp} = req.body

    //check if the field is filled
    if(!otp){
      return res.status(400).json({message: "Otp is required"})
    }

    //find the user otp
    const user = await User.findOne({otp})
    if(!user){
      return res.status(400).json({message: "invalid OTP"})
    }

    //check if otp is expired
    if(user.otpExpires < Date.now()){
      return res.status(400).json({message: "OTP has expired"})
    }

    //clear the otp after a successful verification
    // Clear OTP and expiration on successful verification
    await User.updateOne({ _id: user._id }, { otp: undefined, otpExpires: undefined });

    res.status(200).json({message: "OTP verified successfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal server error"})
  }
}

//reset password
export const resetPassword = async(req, res) => {
  try {
    const {newPassword, confirmPassword} = req.body

    //check if fields are provided
    if(!newPassword || !confirmPassword){
      return res.status(400).json({message: "newPassword and confirmPassword are required"})
    }

    //check if new password and confirm password match
    if(newPassword !== confirmPassword){
      return res.sttaus(400).json({message: "Passwords do not match"})
    }
  
      //hash password
    const saltRounds = process.env.SALT_ROUNDS
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

    const user = await User.findOneAndUpdate(  
      { _id: req.user.id }, 
      { password: hashedPassword },
      { new: true } 
    );

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Password reset successful' });

  } catch (error) {
    console.log(error )
    res.status(500).json({message: "Internal server error"})
  }
}