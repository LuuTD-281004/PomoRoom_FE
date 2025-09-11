import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Page/Homepage";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";
import Navbar from "./Navbar";
import Header from "./partials/Header";
import "./App.css";
function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/rooms" element={<h1>Phòng Pomodoro</h1>} />
        <Route path="/ranking" element={<h1>Bảng xếp hạng</h1>} />
        <Route path="/ranking/personal" element={<h1>Thành tích cá nhân</h1>} />
        <Route path="/plans" element={<h1>Các gói trải nghiệm</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
