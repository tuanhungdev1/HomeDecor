import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, ProductDetailPage, ShopPage } from "./pages";
import { ProtectedRoute, RootLayout } from "./layouts";
import { ForgotPassword, SignInPage, SignUpPage } from "./pages/auth";
import { Provider } from "react-redux";
import { ErrorPage, NotFoundPage } from "./pages/errors";
import { store } from "./stores/store";

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
        element: <ProtectedRoute />,
      },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
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
