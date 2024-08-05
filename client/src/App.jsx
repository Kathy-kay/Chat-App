import { Routes,Route } from "react-router-dom"
import AuthLayout from "./_auth/AuthLayout"
import SignupForm from "./_auth/forms/SignupForm"
import SigninForm from "./_auth/forms/SigninForm"
import EmailVerify from "./_auth/forms/EmailVerify"
import OtpVerify from "./_auth/forms/OtpVerify"
import ResetPassword from "./_auth/forms/ResetPassword"
import RootLayout from "./root/RootLayout"
import { Home } from "lucide-react"
import Chatroom from "./root/pages/Chatroom"
import Profile from "./root/pages/Profile"




function App() {
  
  return (
    <main className="flex h-screen">
      <Routes>

        {/* public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/sign-in" element={<SigninForm />}/>
          <Route path="/forgotpassword/email-verify" element={<EmailVerify />}/>
          <Route path="/forgotpassword/otp-verify" element={<OtpVerify />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
        </Route>

        {/* privete Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home/>} />
          <Route path="/chat/message" element={<Chatroom />}/>
          <Route path="/profile" element={<Profile />}/>
        </Route>
      </Routes>
    </main>
  )
}

export default App
