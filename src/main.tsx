import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages";
import { RootLayout } from "./layouts";
import { SignInPage, SignUpPage } from "./pages/auth";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
