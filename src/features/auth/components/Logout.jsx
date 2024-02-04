import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, signOutAsync } from "../authSlice";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  });

  return <>{!user && <Navigate to="/login" replace={true} />}</>;
}

export default Logout;
