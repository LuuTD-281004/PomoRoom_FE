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
import LayoutWithChatBot from "./partials/LayoutWithChatBot"; // Thêm import
import ProtectedRoute from "./Components/routes/ProtectedRoute";
import PublicRoute from "./Components/routes/PublicRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <SettingsProvider>
            <RoomSetupProvider>
              <Router>
                <ScrollToTop />
                <Routes>
                  <Route element={<LayoutWithChatBot />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ranking" element={<RankingPage />} />
                    <Route path="/plans" element={<ServicesPage />} />
                  </Route>

                  <Route element={<ProtectedRoute />}>
                    <Route element={<LayoutWithHeader />}>
                      <Route element={<RoomLayout />}>
                        <Route path="/rooms" element={<SetupRoomPage />} />
                        <Route
                          path="/private-room"
                          element={<PrivateRoomPage />}
                        />
                        <Route
                          path="/group-room/:roomId"
                          element={<GroupRoomPage />}
                        />
                      </Route>
                    </Route>
                  </Route>

                  <Route element={<ProtectedRoute />}>
                    <Route element={<LayoutWithMinimizedHeader />}>
                      <Route path="/packages" element={<PaymentPage />} />
                    </Route>
                  </Route>

                  <Route element={<LayoutAuth />}>
                    <Route element={<PublicRoute />}>
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                      <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </RoomSetupProvider>
          </SettingsProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
