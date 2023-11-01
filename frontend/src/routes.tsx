import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import AddProject from "./pages/AddProject.tsx";
import Project from "./pages/Project.tsx";

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
      {
        element: <Project />,
        path: "/projects",
      },
      {
        path: "/projects/add-project",
        element: <AddProject />,
      },
    ],
  },
]);

export default router;
