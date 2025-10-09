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
import NotFound from "./Page/NotFound";
import GroupRoomPage from "./Page/room/GroupRoomPage";
import ProfilePage from "./Page/ProfilePage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
                    <Route
                      path="/group-room/:roomId"
                      element={<GroupRoomPage />}
                    />
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
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </RoomSetupProvider>
        </SettingsProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
