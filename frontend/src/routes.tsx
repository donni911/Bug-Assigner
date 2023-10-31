import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
