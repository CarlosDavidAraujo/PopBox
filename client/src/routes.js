import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom"
import { LoginPage } from "./features/signIn_login/containers/LoginPage"
import { UserFoldersPage } from "./features/user_folders/containers/UserFoldersPage"
import { UserProfilePage } from "./features/user_profile/containers/UserProfilePage"
import { useAuth } from "./contexts/AuthContext"
import { AdminPage } from "./features/admin/AdminPage"

const ProtectedByAuthenticationRoutes = () => {
  const { token } = useAuth()
  if (!token) {
    return <Navigate to="/" />
  }
  return <Outlet />
}

const ProtectedByAdminRoutes = () => {
  const { token, user } = useAuth()
  if (!token) {
    return <Navigate to="/" />
  }
  if (!user.administrador) {
    return <Navigate to="/usuario/pastas" />
  }
  return <Outlet />
}

const ProtectedByNotAuthenticationRoutes = () => {
  const { token } = useAuth()
  if (token) {
    return <Navigate to="/usuario/pastas" />
  }
  return <Outlet />
}

const Routes = () => {
  const routesForAuthenticatedOnly = [
    {
      path: "/usuario",
      element: <ProtectedByAuthenticationRoutes />,
      children: [
        { path: "/usuario/pastas", element: <UserFoldersPage /> },
        { path: "/usuario/perfil", element: <UserProfilePage /> },
        //{ path: "/usuario/admin", element: <AdminPage /> },
      ],
    },
  ]

  const routesForAdminOnly = [
    {
      path: "/admin",
      element: <ProtectedByAdminRoutes />,
      children: [{ path: "/admin", element: <AdminPage /> }],
    },
  ]

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedByNotAuthenticationRoutes />,
      children: [{ path: "/", element: <LoginPage /> }],
    },
  ]

  const router = createBrowserRouter([
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
    ...routesForAdminOnly,
  ])

  return <RouterProvider router={router} />
}

export default Routes
