import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Post from "../components/Post";
import RegisterPage from "../components/auth/Register";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { Login } from "../components/auth/Login";
import PageManagment from "../pages/PageManagment";
import About from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Post />
      </ProtectedRoute>
    ),
  },
  {
    path: "/about",
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },
  {
    path: "/page",
    element: (
      <ProtectedRoute>
        <PageManagment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
