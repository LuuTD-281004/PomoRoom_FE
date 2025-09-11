// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Page/Homepage";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* route chính */}
        <Route path="/" element={<Homepage />} />

        {/* các route khác */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* fallback nếu path không tồn tại */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
