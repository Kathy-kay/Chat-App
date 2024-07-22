import { Routes,Route } from "react-router-dom"
import Auth from "./pages/auth"
import Profile from "./pages/profile"
import Chat from "./pages/chat"



function App() {
  
  return (
   <Routes>
     <Route path="/auth" element={<Auth/>}/>
     <Route path="/profile" element={<Profile/>}/>
     <Route path="/chat" element={<Chat/>}/>
   </Routes>
  )
}

export default App
