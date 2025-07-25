import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import ErrorToast from "./components/ErrorToast/ErrorToast";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorProvider } from "./contexts/ErrorContext";

import App from "./App";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ErrorToast />
      </AuthProvider>
    </ErrorProvider>
  </StrictMode>,
);
