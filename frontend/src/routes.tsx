import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import AddProject from "./pages/AddProject.tsx";
import BugsPage from "./pages/BugsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProjectsPage />,
      },
      {
        element: <BugsPage />,
        path: "/bugs",
      },
      {
        path: "/projects/add-project",
        element: <AddProject />,
      },
    ],
  },
]);

export default router;
