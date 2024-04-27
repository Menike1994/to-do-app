import { createBrowserRouter } from "react-router-dom";
import { Protected } from "./components/withAuth";
import AuthPage from "./pages/authPage";
import HomePage from "./pages/homePage";
import TaskPage from "./pages/taskPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <AuthPage isSignIn={true} />,
  },
  {
    path: "/register",
    element: <AuthPage isSignIn={false} />,
  },
  {
    path: "/task",
    element: <TaskPage />,
  },
]);
