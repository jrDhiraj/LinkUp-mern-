import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import './App.css'
import LandingPage from './pages/LandingPage'
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./context/Authcontext";
import VideoMeet from "./pages/VideoMeet";
import HomeComponent from "./pages/Home";
import History from "./pages/History";

function App() {

  return (
    <Router>
      <AuthProvider>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomeComponent />}/>
        <Route path="/history" element={<History />} />
        <Route path='/auth' element={<Authentication />} />
        <Route path='/:url' element={<VideoMeet />} />
        


      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
