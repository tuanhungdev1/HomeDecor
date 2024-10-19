import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomePage,
  ProductDetailPage,
  ShopPage,
  UserProfilePage,
} from "./pages";
import { RootLayout } from "./layouts";
import { ForgotPassword, SignInPage, SignUpPage } from "./pages/auth";
import { Provider } from "react-redux";
import { ErrorPage, NotFoundPage } from "./pages/errors";
import { store } from "./stores/store";
import { AdminHomePage, LoginAdminPage, SignUpAdminPage } from "./pages/admin";
import ProtectedRoute from "./routes/ProtectedRoute";
import { UserRole } from "./types/Enums";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      // Đường dẫn không cần bảo vệ, vẫn render RootLayout

      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/user-profile",
        element: (
          <ProtectedRoute
            navigateTo="/auth/sign-in"
            roles={[UserRole.Customer]}
          >
            <UserProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute navigateTo="/admin/login" roles={[UserRole.Admin]}>
        <AdminHomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/admin/login",
    element: <LoginAdminPage />,
  },
  {
    path: "/admin/sign-up",
    element: <SignUpAdminPage />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/error-page",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
