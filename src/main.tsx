import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, UserProfilePage } from "./pages";
import { RootLayout } from "./layouts";
import { ForgotPassword, SignInPage, SignUpPage } from "./pages/auth";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import {
  AccountSection,
  AddressSection,
  OrdersSection,
  WishlistSection,
} from "./modules/userProfile";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/user-profile",
        element: <UserProfilePage />,
        children: [
          {
            path: "",
            element: <AccountSection />,
          },
          {
            path: "address",
            element: <AddressSection />,
          },
          {
            path: "orders",
            element: <OrdersSection />,
          },
          {
            path: "wishlist",
            element: <WishlistSection />,
          },
        ],
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
