import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./features/signIn_login/containers/HomePage";
import { UserFoldersPage } from "./features/user_folders/containers/UserFoldersPage";
import { UserProfilePage } from "./features/user_profile/containers/UserProfilePage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: '/usuario',
    element: <UserFoldersPage/>
  },
  {
    path: '/usuario/perfil',
    element: <UserProfilePage/>
  },
  {
    //path: 'endpoint',
    //element: <Componente/>
  }
]);

export default router;