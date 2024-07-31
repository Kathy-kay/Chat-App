import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: [true, "Please enter your email address"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please enter your password"]
    },
    status: {
      type: String, 
      default: "active"

    },
    profleImage: {
      type:String,
      required:false
    },
    color: {
      type: Number,
      required: false
    },
    profileSetup:{
      type:Boolean,
      default: false
    },     
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model("User", userSchema)

export default User