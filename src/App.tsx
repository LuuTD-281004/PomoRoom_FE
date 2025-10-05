import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";
import RankingPage from "./Page/RankingPage";
import LayoutWithHeader from "./partials/LayoutWithHeader";
import LayoutAuth from "./partials/LayoutAuth";
import ServicesPage from "./Page/ServicesPage";
import { AuthProvider } from "./providers/AuthProvider";
import "./i18n";
import SetupRoomPage from "./Page/room/SetupRoomPage";
import RoomLayout from "./Page/room/layouts/RoomLayout";
import PaymentPage from "./Page/PaymentPage";
import LayoutWithMinimizedHeader from "./partials/LayoutWithMinimizedHeader";
import { SettingsProvider } from "./providers/SettingsProvider";
import { RoomSetupProvider } from "./providers/RoomSetupProvider";
import HomePage from "./Page/Homepage";
import ScrollToTop from "./Components/ScrollToTop";
import PrivateRoomPage from "./Page/room/PrivateRoomPage";

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <RoomSetupProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route element={<LayoutWithHeader />}>
                <Route path="/" element={<HomePage />} />
                <Route element={<RoomLayout />}>
                  <Route path="/rooms" element={<SetupRoomPage />} />
                  <Route path="/private-room" element={<PrivateRoomPage />} />
                </Route>
                <Route path="/ranking" element={<RankingPage />} />
                <Route path="/plans" element={<ServicesPage />} />
              </Route>
              <Route element={<LayoutWithMinimizedHeader />}>
                <Route path="/packages" element={<PaymentPage />} />
              </Route>

              <Route element={<LayoutAuth />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
          </Router>
        </RoomSetupProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
