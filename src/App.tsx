import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import UseAuth from "./contexts/useAuth";
import { Registration } from "./pages/Registration";
import UserStorage from "./contexts/useStorage";
import { AppointamentBook } from "./pages/AppointamentBook";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <UseAuth>
        <UserStorage>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/profile/:userId"
              element={
                <PrivateRoute>
                  <Registration />
                </PrivateRoute>
              }
            />
            <Route
              path="/contacts/register"
              element={
                <PrivateRoute>
                  <Registration />
                </PrivateRoute>
              }
            />
            <Route
              path="/contacts/edit/:userId"
              element={
                <PrivateRoute>
                  <AppointamentBook />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/users/register" element={<Registration />} />
          </Routes>
        </UserStorage>
      </UseAuth>
      <ToastContainer position="top-center" autoClose={5000} />
    </Router>
  );
}

export default App;
