import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isProtected: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
    isProtected: true,
  },
  {
    path: "/auth/login",
    name: "Login",
    element: <Login />,
    isPublic: true,
  },
];

export const publicRoutes = routes.filter((i) => i.isPublic);
export const protectedRoutes = routes.filter((i) => i.isProtected);
