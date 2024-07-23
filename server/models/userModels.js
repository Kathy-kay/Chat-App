import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your full name"]
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
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationTokenExpires: {
      type: Date
    },
    verificationToken: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true
  }
)

const User = mongoose.model("User", userSchema)

export default User