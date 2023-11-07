import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ProjectPage from "./pages/Project/ProjectPage.tsx";
import ProjectsPage from "./pages/Project/ProjectsPage.tsx";
import AddProject from "./pages/Project/AddProject.tsx";
import BugsPage from "./pages/Bugs/BugsPage.tsx";

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
      {
        path: "/projects/:slug",
        element: <ProjectPage />,
      },
    ],
  },
]);

export default router;
