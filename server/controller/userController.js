import User from "../models/userModels";
import bcrypt from "bcrypt"
import generate from "otp-generator"
import jwt from "jsonwebtoken"
import emailVerification from "../utils/emailSender";



const signup = async (req, res) => {

  try {
    const {email, password, confirmPassword} = req.body
  
  //validate email and password
  if(!email || !password || !confirmPassword){
    res.status(400).json({message: "All fields are required"})
  }

  if(password !== confirmPassword){
    res.status(400).json({message: "Password and confirm Password do not match"})
  }
  //check if email already exist
  const userExist = await User.findOne({email})
  if(userExist){
    res.status(400).json({message: "User with given emial already exist"})
  }

  //hash password
  const saltRounds = process.env.SALT_ROUNDS
  const hashedPassword = bcrypt.hash(password, saltRounds)

  //create ne user
  const newUser = await User.create({
    email, 
    password: hashedPassword,
    verificationToken,
    verificationTokenExpires,
    isVerified: false
  })
  res.status(201).json({message: "User created successfully"})

  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal server error"})
  }
}

export const login = async(req, res) =>{
 try {

  const { email, password } = req.body;

  //validate the fields
  if(!email || !password){
    res.status(400).json({message: "All fields are required"})
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
      res.status(400).json({message: "Email is required"})
    }
    //check if email exist
    const user = await User.findOne({email})
    if(!user){
      res.status(400).json({message: "No user found with the provided email"})
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
    await user.updateOne({ otp, otpExpires });

    //send verification email
    await emailVerification(email, otp)
    res.status(200).json({message: "OTP sent to email"})
  } catch (error) {
    console.log(error )
    res.status(500).json({message: "Internal server error"})
  }
}


//otp verification

//reset password