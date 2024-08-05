import { Routes,Route } from "react-router-dom"
import Auth from "./_auth"
import Profile from "./root/pages/Profile"
import Chat from "./root/pages/chat"



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
