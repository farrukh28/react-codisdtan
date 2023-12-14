import { Container } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useReduxUser } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { removeAuthUser } from "../../redux/slices/authUser";
import axios from "axios";

const Header = () => {
  // router
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // hooks
  const reduxUser = useReduxUser();

  // redux
  const dispatch = useDispatch();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    axios.defaults.headers.common["Authorization"] = "";
    dispatch(removeAuthUser());
  };

  return (
    <header className="sticky top-0 left-0 z-10 py-4 bg-[#5FBDFF]">
      <Container>
        <div className="flex items-center justify-between">
          <span
            onClick={handleGoHome}
            className="text-lg font-semibold cursor-pointer md:text-2xl"
          >
            Header
          </span>
          <div>
            {reduxUser ? (
              <div className="flex gap-3">
                <Link to="/dashboard">Dashboard</Link>
                <span onClick={handleLogout} className="cursor-pointer">
                  Logout
                </span>
              </div>
            ) : (
              pathname !== "/auth/login" && <Link to="/auth/login">Login</Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
