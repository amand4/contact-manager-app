import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {
  UserContext
} from "../contexts/useAuth";
const PrivateRoute = ({ children }) => {
  const { userData } = useContext(UserContext);
  if (!userData) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
