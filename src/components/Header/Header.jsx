import { Container } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReduxUser } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { removeAuthUser } from "../../redux/slices/authUser";
import axios from "axios";

const Header = () => {
  // router
  const navigate = useNavigate();

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
    <header className="py-4 bg-blue-200 ">
      <Container>
        <div className="flex items-center justify-between">
          <span
            onClick={handleGoHome}
            className="text-lg cursor-pointer md:text-2xl"
          >
            Header
          </span>
          <div>
            {reduxUser ? (
              <span onClick={handleLogout} className="cursor-pointer">
                Logout
              </span>
            ) : (
              <Link to="/auth/login">Login</Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
