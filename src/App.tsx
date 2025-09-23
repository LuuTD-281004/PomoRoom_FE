import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Page/Homepage";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";
import RankingPage from "./Page/RankingPage";
import LayoutWithHeader from "./partials/LayoutWithHeader";
import LayoutAuth from "./partials/LayoutAuth";
import ServicesPage from "./Page/ServicesPage";
import { AuthProvider } from "./providers/AuthProvider";
import "./i18n";
import SetupRoom from "./Page/room/SetupRoom";
import PrivateRoom from "./Page/room/PrivateRoom";
import RoomLayout from "./Page/room/layouts/RoomLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<LayoutWithHeader />}>
            <Route path="/" element={<Homepage />} />
            <Route element={<RoomLayout />}>
              <Route path="/rooms" element={<SetupRoom />} />
              <Route path="/private-room" element={<PrivateRoom />} />
            </Route>
            <Route path="/ranking" element={<RankingPage />} />
            <Route
              path="/ranking/personal"
              element={<h1>Thành tích cá nhân</h1>}
            />
            <Route path="/plans" element={<ServicesPage />} />
          </Route>

          <Route element={<LayoutAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
