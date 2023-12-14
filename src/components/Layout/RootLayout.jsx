import { Container } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import NoPage from "../NoPage/NoPage";
import { publicRoutes, protectedRoutes } from "../../routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PublicRoutes from "../HOC/PublicRoutes";
import ProtectedRoutes from "../HOC/ProtectedRoutes";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen gap-4 bg-[#eee]">
      <Header />
      <Container className="flex-grow">
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PublicRoutes component={route.element} />}
            />
          ))}
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<ProtectedRoutes component={route.element} />}
            />
          ))}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
};

export default RootLayout;
