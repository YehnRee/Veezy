import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import VideoScreen from "./screens/VideoScreen";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProfileScreen from "./screens/ProfileScreen";
import VideoUploadScreen from "./screens/VideoUploadScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import VideoEditScreen from "./screens/VideoEditScreen";
import SubscriberRoute from "./components/SubscriberRoute";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname === "/welcome"; // Hide header for welcome page

  return (
    <>
      {!hideHeader && <Header />}
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomeScreen />} exact />
              
              {/* Wrap each route individually in SubscriberRoute */}
              <Route path="/videos/:id" element={<SubscriberRoute><VideoScreen /></SubscriberRoute>} />
              <Route path="/profile" element={<SubscriberRoute><ProfileScreen /></SubscriberRoute>} />
              <Route path="/upload-video" element={<SubscriberRoute><VideoUploadScreen /></SubscriberRoute>} />
              <Route path="/videos/edit/:id/" element={<SubscriberRoute><VideoEditScreen /></SubscriberRoute>} />
              {/* <Route path="/subscription" element={<SubscriptionScreen />} /> */}
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;