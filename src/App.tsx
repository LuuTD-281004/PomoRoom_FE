import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Page/Homepage";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";
import RankingPage from "./Page/RankingPage";
import LayoutWithHeader from "./partials/LayoutWithHeader";
import LayoutAuth from "./partials/LayoutAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/rooms" element={<h1>Phòng Pomodoro</h1>} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/ranking/personal" element={<h1>Thành tích cá nhân</h1>} />
          <Route path="/plans" element={<h1>Các gói trải nghiệm</h1>} />
        </Route>

        <Route element={<LayoutAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
