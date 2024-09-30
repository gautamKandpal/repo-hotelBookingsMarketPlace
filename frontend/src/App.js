import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./booking/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Dashboard from "./user/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoutes";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";

function App() {
  return (
    <Router>
      <TopNav />

      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/seller"
          element={
            <PrivateRoute>
              <DashboardSeller />
            </PrivateRoute>
          }
        />
        <Route
          path="/hotels/new"
          element={
            <PrivateRoute>
              <NewHotel />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
