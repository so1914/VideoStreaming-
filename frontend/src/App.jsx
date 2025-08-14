import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"; 
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />

      </Routes>
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Router> 
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;