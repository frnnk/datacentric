import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Chat from "./components/pages/Chat.js"
import PageTemplate from "./components/modules/PageTemplate.js"
import Interface from "./components/pages/Interface.js"
import Hero from "./components/pages/Hero.js"
import SignUp from "./components/pages/SignUp.js"
import Login from "./components/pages/Login.js"
import Projects from "./components/pages/Projects.js"

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Hero />} />
        <Route path="/test" element={<PageTemplate />} />
        <Route path="/chat/:id" element={<Interface />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
