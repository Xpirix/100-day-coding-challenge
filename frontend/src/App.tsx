import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ActivateAccount from "./pages/ActivateAccount";
import WorkoutList from "./components/WorkoutList";
import PublicRoute from "./components/PublicRoute";
import RequestPasswordReset from "./pages/RequestPasswordReset";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={< PublicRoute component={Register} />} />
          <Route path="/login" element={<PublicRoute component={Login} />} />
          <Route path="/activate/:uid/:token" element={<PublicRoute component={ActivateAccount} />} />
          <Route path="/password-reset" element={<PublicRoute component={RequestPasswordReset} />} />
          <Route
            path="/"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route
            path="/workouts"
            element={<ProtectedRoute component={WorkoutList} />}
          />

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
