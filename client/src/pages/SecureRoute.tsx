import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

const SecureRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return <div>{user ? <Outlet /> : <Navigate to="/sign-in" />}</div>;
};

export default SecureRoute;
