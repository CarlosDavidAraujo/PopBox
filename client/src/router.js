import { createBrowserRouter } from "react-router-dom";
import { Cadastro } from "./pages/Cadastro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Cadastro/>,
  },
  {
    //path: 'endpoint',
    //element: <Componente/>
  }
]);

export default router;