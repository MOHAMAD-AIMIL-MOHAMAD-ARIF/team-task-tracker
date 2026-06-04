import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import ProjectsPage from "./pages/ProjectsPage";
import LoginPage from "./pages/LoginPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import TaskEditPage from "./pages/TaskEditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
      {
        path: "tasks/:taskId",
        element: <TaskDetailsPage />,
      },
      {
        path: "tasks/:taskId/edit",
        element: <TaskEditPage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;